import type { FromTo } from './from-to.component';
import { generatePairs } from './generate-pairs';

export type Iterable = FromTo | [number, number];
export type Action<T extends unknown> = (from: number, to: number) => T | Promise<T>;

export class BatchPairs extends Array<Iterable> {

    constructor(...args: Parameters<typeof generatePairs>) {
        super();
        this.push(...generatePairs(...args));
    }

    iterate<T>(cb: Action<T>): Promise<T[]> {
        return batchIterateOverPairs(this, cb);
    }
    
}

export function batchPairs(...args: ConstructorParameters<typeof BatchPairs>) {
    return new BatchPairs(...args);
}

export function batchIterate<T>(from: number, to: number, batch: number, cb: Action<T>): Promise<T[]> {
    const pairs = generatePairs(from, to, batch);
    return batchIterateOverPairs(pairs, cb);
}

export async function batchIterateOverPairs<T>(pairs: Iterable[], cb: Action<T>): Promise<T[]> {
    const results = [] as T[];
    for (const [from, to] of pairs) {
        results.push(await cb(from, to));
    }
    return results;
}
