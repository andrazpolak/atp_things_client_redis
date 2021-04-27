'use strict'
const Redis_ATP = require('./atp_things_redis.js');
// redis clients
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME || 'redis';
let client = new Redis_ATP({ host: REDIS_HOSTNAME });
let subscriber = new Redis_ATP({ host: REDIS_HOSTNAME });

module.exports = {
    client,
    subscriber
}