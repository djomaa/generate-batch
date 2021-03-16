const { batchIterate } = require('../dist');
const BATCH_SIZE = 1e3;
const from = 0;
const to = 20e3;

const fetch = ({ from, to }) => new Promise((resolve) => {
    const data = Array.from({ length: to - from + 1 }, () => Math.random());
    resolve(data);
});

async function action(from, to) {
    console.log(`from ${from} to ${to}`)
    const data = await fetch({ from, to });
    return data.filter((value) => value > 0.5).length;
}

async function main() {
    const data = await batchIterate(action, from, to, BATCH_SIZE);
    console.log(data);
}

main();


