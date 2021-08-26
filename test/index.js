'use strict'
require('dotenv-flow').config();
const atp_things = require('../src/');

console.log("Test: start");

async function main() {
    let data = {};
    try {
        data = await atp_things.getList();
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    console.log("Received:", data);
}

main().catch(console.log);

console.log("Test: end");