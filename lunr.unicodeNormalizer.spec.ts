import * as lunr from "lunr";
import folding from "./lunr.unicodeNormalizer";
import { strict as assert } from "node:assert";

folding(lunr);

function make_index() {
  return lunr(function() {
    this.ref("id");
    this.field("text");
    this.add({ id: "1", text: "Étape 1: Collecter des bobettes"});
    this.add({ id: "2", text: "Étape 2: ???"});
    this.add({ id: "3", text: "Étape 3: Profit"});
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
    const results = idx.search("etape 3");
    assert.ok(results);
    assert.equal(results[0].ref, "3");
  });
});
