import * as lunr from "lunr";
import * as fs from "node:fs";
import folding from "./lunr.unicodeNormalizer";
import { strict as assert } from "node:assert";

folding(lunr);

function make_index() {
  return lunr(function () {
    this.ref("id");
    this.field("text");
    this.add({ id: "1", text: "Onésime" });
    this.add({ id: "2", text: "Herménégilde" });
    this.add({ id: "3", text: "Omertà" });
  });
}

describe("Test indexing", () => {
  it("Should make an index", () => {
    const idx = make_index();
    assert.ok(idx);
  });
});

describe("Test search with folding", () => {
  it("Should return ref 3", () => {
    const idx = make_index();
    const results = idx.search("omerta");
    assert.ok(results);
    assert.equal(results[0].ref, "3");
  });
  it("Should return ref 2", () => {
    const idx = make_index();
    const results = idx.search("herménégilde");
    assert.ok(results);
    assert.equal(results[0].ref, "2");
  });
});

describe("Test save and load search with folding", () => {
  it("Should save an index", () => {
    const idx1 = make_index();
    fs.writeFileSync("test-index.json", JSON.stringify(idx1.toJSON()));
  });
  let idx: lunr.Index;
  it("Should restore the index", () => {
    idx = lunr.Index.load(
      JSON.parse(fs.readFileSync("test-index.json", "utf8")),
    );
    assert.ok(idx);
  });
  it("Should return ref 3", () => {
    const results = idx.search("omerta");
    assert.ok(results);
    assert.equal(results[0].ref, "3");
  });
  it("Should return ref 1", () => {
    const results = idx.search("onésime");
    assert.ok(results);
    assert.equal(results[0].ref, "1");
  });
});
