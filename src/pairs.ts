import { FromTo } from './from-to.component';
import { batchIterator } from './iterator';

/**
 * @description Obtain batch iterator into an array
 */
export function batchPairs(from: number, to: number, batch: number): FromTo[] {
    return Array.from(batchIterator(from, to, batch));
}

