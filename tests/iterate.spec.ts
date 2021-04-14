import { strictEqual, deepStrictEqual } from 'assert';

import { batchIterate } from "../src";

function sleep(ms: number) {
    return new Promise<void>((resolve) => void setTimeout(() => resolve(), ms));
}

describe('iterate', () => {
    it('should be executed one by one', async () => {
        const result = await batchIterate(1, 5, 1, async (from, to) => {
            strictEqual(from, to, 'something went wrong');
            await sleep((5 - from) * 10);
            return from;
        })
        deepStrictEqual(result, [1, 2, 3, 4, 5]);
    });
})
