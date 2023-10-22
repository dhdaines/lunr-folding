# lunr-folding

An extension to [lunr.js](http://lunrjs.com/) to do basic character
folding, converting various accented and non-ASCII characters to their
(presumed) ASCII equivalents.

For example, searching for "facade" will return results for "façade" and
searching for for "façade" will return results for "facade."

## Usage

Install via npm `npm install lunr-folding`. After lunr is loaded do:

```javascript
require("lunr-folding")(lunr);
```

Or in TypeScript:

```typescript
import folding from "lunr-folding";
folding(lunr)
```

You can now create indexes with accented characters and search them
without accents, for example:

```
folding(lunr);
const idx = lunr(function () {
    this.ref("id");
    this.field("text");
    this.add({ id: "1", text: "Étape 1: Collecter des bobettes" });
    this.add({ id: "2", text: "Étape 2: ???" });
    this.add({ id: "3", text: "Étape 3: Profit" });
});
const results = idx.search("etape 3");
console.log(JSON.stringify(results[0]));
```

## Credits

Based on the original lunr.unicodeNormalizer.js by Christopher Van and
the NPM-ified version by Dániel Boros
