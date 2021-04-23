import { batchIterator } from "./iterator";

export type Action<T extends unknown> = (from: number, to: number) => T | Promise<T>;

/**
 * @description synchronously (one-after-one) apply callback for every batch pair
 */
export async function batchIterate<T>(from: number, to: number, batch: number, cb: Action<T>): Promise<T[]> {
    const results = [] as T[];
    for (const pair of batchIterator(from, to, batch)) {
        results.push(await cb(pair.from, pair.to));
    }
    return results;
}

