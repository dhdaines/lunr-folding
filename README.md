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
## Credits

Based on the original lunr.unicodeNormalizer.js by Christopher Van and
the NPM-ified version by Dániel Boros
