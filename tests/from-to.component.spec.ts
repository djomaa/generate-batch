import { strictEqual } from 'assert';

import { FromTo } from '../src/from-to.component';

describe('from-to component', () => {
    const a = 1;
    const b = 2;
    const c = new FromTo(a, b);
    describe('can be accessed as an object', () => {
        it('x', () => void strictEqual(c.from, a));
        it('y', () => void strictEqual(c.to, b));
    })
    describe('can be accessed as an array', () => {
        it('x', () => void strictEqual(c[0], a));
        it('y', () => void strictEqual(c[1], b));
    })
    describe('can be desctructured', () => {
        it('as array', () => {
            const [actualFrom, actualTo] = c;
            strictEqual(actualFrom, a);
            strictEqual(actualTo, b);
        });
        it('as object', () => {
            const { from: actualFrom, to: actualTo } = c;
            strictEqual(actualFrom, a);
            strictEqual(actualTo, b);
        })
    })
});


export {}
