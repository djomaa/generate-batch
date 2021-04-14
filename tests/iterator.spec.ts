import { deepStrictEqual } from 'assert';

import { batchIterator } from "../src";

function test(from: number, to: number, batch: number, expectedPairs: [number, number][]) {
    const expectedString = expectedPairs.map(([from, to]) => `${from}-${to}`).join(' ');
    it(`from ${from} to ${to} with batch ${batch} = ${expectedString}`, () => {
        const iterator = batchIterator(from, to, batch);
        for (const actual of iterator) {
            const expected = expectedPairs.shift();
            deepStrictEqual([actual.from, actual.to], expected);
        }
    });
}

describe('iterator', () => {
    describe('ahead', () => {
        test(100, 100, 5, [[100, 100]]);
        test(100, 103, 5, [[100, 103]]);
        test(100, 104, 5, [[100, 104]]);
        test(100, 105, 5, [[100, 104], [105, 105]]);
        test(100, 106, 5, [[100, 104], [105, 106]]);
    });
    describe('behind', () => {
        test(106, 100, 5, [[102, 106], [100, 101]]);
        test(105, 100, 5, [[101, 105], [100, 100]]);
        test(104, 100, 5, [[100, 104]]);
        test(103, 100, 5, [[100, 103]]);
        test(100, 100, 5, [[100, 100]]);
    });
})
