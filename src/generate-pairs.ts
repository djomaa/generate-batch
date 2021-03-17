import { FromTo } from './from-to.component';
import assert from 'assert';
// TODO: validation
export function generatePairs(from: number, to: number, batch: number) {
    assert(Number.isSafeInteger(from), 'From is not integer');
    assert(Number.isSafeInteger(to), 'To is not integer');
    assert(Number.isSafeInteger(batch), 'Batch is not integer');
    assert(to >= from, 'To should not be less than from');
    assert(batch > 0, 'batch should be bigger than 0');

    const size = to - from + 1;
    const lastBatchSize = size % batch;
    const normalPairsCount = (size - lastBatchSize) / batch;

    const pairs: FromTo[] = new Array(normalPairsCount + (lastBatchSize ? 1 : 0));

    for (let i = 0; i < normalPairsCount; i += 1) {
        const cFrom = from + (batch * i);
        const cTo = cFrom + batch - 1;
        pairs[i] = new FromTo(cFrom, cTo);
    }

    if (lastBatchSize) {
        const cFrom = normalPairsCount ? pairs[pairs.length - 2].to + 1: from;
        pairs[normalPairsCount] = new FromTo(cFrom, to);
    }

    return pairs;
}
