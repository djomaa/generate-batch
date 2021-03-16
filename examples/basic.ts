// import { batchPairs } from 'batch-pairs';
import { batchIterate, batchIterateOverPairs, BatchPairs, batchPairs, generatePairs } from '../dist';

const pairs1 = generatePairs(100, 101, 2);
// FromTo[] [ [ 0: 100, 1: 101, from: 100, to: 101 ] ]


const pairs2 = batchPairs(100, 101, 2);
// BatchPairs [ [ 0: 100, 1: 101, from: 100, to: 101 ], syncIterate: Function ]

const pairs3 = new BatchPairs(100, 103, 2);
// same as pairs1

function act(from: number, to: number): number {
    return from + to;
}

async function main() {
    const result1 = await pairs2.iterate((from, to) => from + to);
    // [100 + 101]
    
    const result2 = await pairs2.iterate(act);
    // same as result1
    
    const result3 = await batchIterate(act, 100, 103, 2);
    // same as result1
    
    const result4 = await batchIterateOverPairs(pairs1, act);
    // same as result1   
}

