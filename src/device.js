const redis_client = require('../lib/atp_redis/atp_things_redis_objects').client;

async function list() {
    let data;
    try {
        data = await redis_client.hgetallJSON("devices");
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};
async function setIdentity(identity) {
    let data;
    try {
        data = await redis_client.hsetJSON("device", identity.uuid, identity);
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};
async function get(uuid, property) {
    let data;
    try {
        if (property)
            data = await redis_client.hgetJSON("uuid:" + uuid, property);
        else
            data = await redis_client.hgetallJSON("uuid:" + uuid);

    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};


module.exports = {
    setIdentity,
    list,
    get
}