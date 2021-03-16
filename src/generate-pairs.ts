import useDebug from 'debug';

import { FromTo } from './from-to.component';
import { DEBUG_PREFIX } from './constants';

// TODO: validation
export function generatePairs(from: number, to: number, batch: number) {
    const debug = useDebug(`${DEBUG_PREFIX}:generate-pairs:${from}:${to}:${batch}`);

    debug('started from %s to %s batch %s', from, to, batch);

    const size = to - from + 1;
    debug('size %s', size);

    const lastBatchSize = size % batch;
    debug('lastBatchSize %s', lastBatchSize);

    const normalPairsCount = (size - lastBatchSize) / batch;
    debug('normalPairsCount %s', normalPairsCount);

    const pairs: FromTo[] = new Array(normalPairsCount + (lastBatchSize ? 1 : 0));
    debug('pairs.length %s', pairs.length)

    for (let i = 0; i < normalPairsCount; i += 1) {
        const cFrom = from + (batch * i);
        const cTo = cFrom + batch - 1;
        debug('push normal batch %s - %s', cFrom, cTo);
        pairs[i] = new FromTo(cFrom, cTo);
    }

    if (lastBatchSize) {
        debug('push last batch');
        const cFrom = normalPairsCount ? pairs[pairs.length - 2].to + 1: from;
        debug('push last batch %s - %s', cFrom, to);
        pairs[normalPairsCount] = new FromTo(cFrom, to);
    }

    return pairs;
}
