[![Downloads](https://img.shields.io/npm/dm/ebatch?label=Downloads)](https://www.npmjs.com/package/ebatch)
[![codecov](https://codecov.io/gh/djomaa/generate-batch/branch/1.1.0/graph/badge.svg?token=DPEXGZ7F22)](https://codecov.io/gh/djomaa/generate-batch)

# Batch Iterator
Creates an batch iterator which yields batch `from`, `to` from `X` to `Y` with `Z` batch size. F.e.
```
// from 100 to 107 with batch size = 3:
result      =      [ [100, 102],    [103, 105],    [106, 107] ];
// explanation        100 101 102;   103 104 105;   106 107;
```

## Usage:
### batchIterator
```javascript
const { batchIterator } = require('./dist');

const BATCH_SIZE = 1e3;
const FROM = 0;
const TO = 5e3;

for (const [from, to] of batchIterator(FROM, TO, BATCH_SIZE)) {
    console.log(from, to);
}
/*
    0 999
    1000 1999
    2000 2999
    3000 3999
    4000 4999
    5000 5000
*/
```


### batchPairs
```javascript
const { batchPairs } = require('./dist');

const BATCH_SIZE = 1e3;
const FROM = 0;
const TO = 5e3;

const pairs = batchPairs(FROM, TO, BATCH_SIZE);
/*
    [
        FromTo[0, 999],
        FromTo[1000, 1999],
        FromTo[2000, 2999],
        FromTo[3000, 3999],
        FromTo[4000, 4999],
        FromTo[5000, 5000],
    ]
*/
```

### batchIterate
```javascript
const { batchIterate } = require('./dist');

const BATCH_SIZE = 1e3;
const FROM = 0;
const TO = 5e3;

const sleep = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));

async function main() {
    const result = await batchIterate(FROM, TO, BATCH_SIZE, async (from, to) => {
        console.log('action', from, to); // to check the order of execution
        await sleep(1e3);
        return [from, to];
    });
    console.log('Done:', result);
}

main();
/*
    action 0 999
    action 1000 1999
    action 2000 2999
    action 3000 3999
    action 4000 4999
    action 5000 5000

    Done: [
        [ 0, 999 ],
        [ 1000, 1999 ],
        [ 2000, 2999 ],
        [ 3000, 3999 ],
        [ 4000, 4999 ],
        [ 5000, 5000 ]
    ]
*/
```


### FromTo component
The lib returns custom `FromTo` component. You can use it in the following ways:
1) descructed array
```javascript
for (const [from, to] of batchIterator(FROM, TO, BATCH_SIZE)) {
    console.log(from, to);
}
```
2) as an object
```javascript
for (const pair of batchIterator(FROM, TO, BATCH_SIZE)) {
    console.log(pair.from, pair.to);
}
```
3) as an array
```javascript
for (const pair of batchIterator(FROM, TO, BATCH_SIZE)) {
    console.log(pair[0], pair[1]);
}
```


