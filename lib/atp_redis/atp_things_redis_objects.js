'use strict'
const Redis_ATP = require('./atp_things_redis.js');
// redis clients
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
let client = new Redis_ATP({ host: REDIS_HOSTNAME, port: REDIS_PORT});
let subscriber = new Redis_ATP({ host: REDIS_HOSTNAME, port: REDIS_PORT });

module.exports = {
    client,
    subscriber
}