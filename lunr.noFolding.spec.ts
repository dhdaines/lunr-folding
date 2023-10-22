import * as lunr from "lunr";
import { strict as assert } from "node:assert";

function make_index() {
  return lunr(function() {
    this.ref("id");
    this.field("text");
    this.add({ id: "1", text: "Étape 1: Collecter des bobettes"});
    this.add({ id: "2", text: "Étape 2: ???"});
    this.add({ id: "3", text: "Étape 3: Profit"});
  });
}

describe("Test search without folding", () => {
  it("Should return nothing", () => {
    const idx = make_index();
    const results = idx.search("etape");
    assert.equal(results.length, 0);
  });
});
