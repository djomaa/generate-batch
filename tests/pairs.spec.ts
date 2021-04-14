import { deepStrictEqual } from 'assert';

import { batchPairs } from '../src';


function test(from: number, to: number, batch: number, expected: [number, number][]) {
    const actual = batchPairs(from, to, batch).map(([from, to]) => [from, to]);
    deepStrictEqual(actual, expected);
}

describe('pairs', () => {
    it('ahead', () => void test(100, 106, 5, [[100, 104], [105, 106]]));
    it('behind', () => void test(106, 100, 5, [[102, 106], [100, 101]]));
});


