export class FromTo {
    private iterable: [number, number];

    constructor(
        public readonly from: number,
        public readonly to: number,
    ) {
        this.iterable = [from, to];
    }

    [Symbol.iterator]() {
        let i = 0;
        return {
            current: () => this.iterable[i],
            next: () => ({
                value: this.iterable[i++],
                done: i > this.iterable.length,
            })
        }
    }
}
