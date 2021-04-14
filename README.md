[![Downloads](https://img.shields.io/npm/dm/ebatch?label=Downloads)](https://www.npmjs.com/package/ebatch)
[![codecov](https://codecov.io/gh/djomaa/generate-batch/branch/1.1.0/graph/badge.svg?token=DPEXGZ7F22)](https://codecov.io/gh/djomaa/generate-batch)

# Batch Pairs Generator
Generates batch pairs from `X` to `Y` with `Z` batch size. F.e.
```
from 100 to 104 with 2 batch size:
[ [100, 101], [102, 103], [104, 104] ];
```
Also there is an async one-by-one (like waterfall) iterator.
## Usage:
```
const { batchIterate } = require('ebatch');
const BATCH_SIZE = 1e3;
const from = 0;
const to = 20e3;

const fetch = ({ from, to }) => new Promise((resolve) => {
    const data = Array.from({ length: to - from + 1 }, () => Math.random());
    resolve(data);
});

async function action(from, to) {
    console.log(`from ${from} to ${to}`)
    const data = await fetch({ from, to });
    return data.filter((value) => value > 0.5).length;
}

async function main() {
    const data = await batchIterate(action, from, to, BATCH_SIZE);
    console.log(data);
}

main();
```

