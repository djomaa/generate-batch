import assert from 'assert';
import { FromTo } from './from-to.component';

/**
 * @description Create a batch iterator. 
 * @param from generate from. `from` can be less than `to`
 * @param to generate to
 * @param batch batch size
 */
export function batchIterator(from: number, to: number, batch: number): Generator<FromTo, void, void> {
    assert(Number.isSafeInteger(from), 'From is not integer');
    assert(Number.isSafeInteger(to), 'To is not integer');
    assert(Number.isSafeInteger(batch), 'Batch is not integer');
    assert(batch > 0, 'batch should be bigger than 0');
    return from <= to ? aheadBatchIterator(from, to, batch) : behindBatchIterator(to, from, batch);
}

export function* aheadBatchIterator(from: number, to: number, batch: number): Generator<FromTo, void, void> {
    const size = to - from + 1;
    const lastBatchSize = size % batch;
    const normalPairsCount = (size - lastBatchSize) / batch;

    for (let i = 0; i < normalPairsCount; i += 1) {
        const cFrom = from + (batch * i);
        const cTo = cFrom + batch - 1;
        yield new FromTo(cFrom, cTo);
    }

    if (lastBatchSize) {
        const cFrom = to - lastBatchSize + 1;
        yield new FromTo(cFrom, to);
    }
}

export function* behindBatchIterator(from: number, to: number, batch: number): Generator<FromTo, void, void> {
    const size = to - from + 1;
    const lastBatchSize = size % batch;
    const normalPairsCount = (size - lastBatchSize) / batch;
    for (let i = normalPairsCount; i > 0; i -= 1) {
        const cFrom = to - (batch * i) + 1;
        const cTo = cFrom + batch - 1;
        yield new FromTo(cFrom, cTo);
    }
    
    if (lastBatchSize) {
        const cTo = from + lastBatchSize - 1;
        yield new FromTo(from, cTo);
    }
}
