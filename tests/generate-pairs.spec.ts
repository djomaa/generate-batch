import assert from 'assert';

import { generatePairs } from '../dist/generate-pairs';
import { iteratePairs } from '../types/pairs-iterator.component';


function test(from: number, to: number, batch: number, expected: [number, number][]) {
    const expectedString = expected.map(([from, to]) => `${from}-${to}`).join(' ');
    it(`from ${from} to ${to} with batch ${batch} = ${expectedString}`, () => {
        const pairs = generatePairs(from, to, batch);
        const array = pairs.map(([from, to]) => [from, to]);
    });
}

describe('generate pairs', () => {
    test(100, 100, 5, [[100, 100]]);
    test(100, 103, 5, [[100, 103]]);
    test(100, 104, 5, [[100, 104]]);
    test(100, 105, 5, [[100, 104], [105, 105]]);
    test(100, 106, 5, [[100, 104], [105, 106]]);
});

