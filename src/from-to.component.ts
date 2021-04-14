export class FromTo implements Iterable<number> {
    private iterable: [number, number];

    public readonly 0: number;
    public readonly 1: number;

    constructor(
        public readonly from: number,
        public readonly to: number,
    ) {
        this.iterable = [from, to];
        this[0] = from;
        this[1] = to;
    }

    [Symbol.iterator]() {
        let i = 0;
        let iterable = this.iterable;

        return {
            next(): IteratorResult<number>{
                return {
                    value: iterable[i++],
                    done: i > iterable.length,
                };
            }
        }
    }

}
