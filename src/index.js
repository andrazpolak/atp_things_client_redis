const redis_client = require('../lib/atp_redis/atp_things_redis_objects').client;

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

async function getList() {
    let data;
    try {
        data = await redis_client.getList();
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};

async function getStatus(uuid) {
    let data;
    try {
        data = await get(uuid, "status");
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};

async function getStatusIsConnected(uuid) {
    let data;
    try {
        data = await getStatus(uuid);
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    if (data.connected && Math.abs(Date.now() - data.ts) < 3000)
        return true;
    return false;
};

async function set(uuid, propertyName, property) {
    let data;
    try {
        data = await redis_client.hsetJSON("uuid:" + uuid, propertyName, property);
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};

async function setCfg(uuid, property) {
    let data;
    try {
        data = await set(uuid, "cfg", property);
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};

async function setStatus(uuid, property) {
    let data;
    try {
        data = await set(uuid, "status", { ts: Date.now(), ...property });
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};

async function setStatusConnected(uuid, property) {
    let data;
    try {
        data = await set(uuid, "status", { ts: Date.now(), connected: true, ...property });
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};

async function setStatusDisconnected(uuid, property) {
    let data;
    try {
        data = await set(uuid, "status", { ts: Date.now(), connected: false, ...property });
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};

async function setError(uuid, property) {
    let data;
    try {
        data = await set(uuid, "error", { ts: Date.now(), ...property });
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};

async function publish(uuid, propertyName, property) {
    let data;
    try {
        data = await redis_client.publishJSON("uuid:" + uuid + "." + propertyName, property);
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};
async function publishStatus(uuid, property) {
    let data;
    try {
        data = await publish(uuid, "status", property);
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};
async function publishError(uuid, property) {
    let data;
    try {
        data = await publish(uuid, "error", property);
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};
async function publishInputs(uuid, property) {
    let data;
    try {
        data = await publish(uuid, "inputs", property);
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};

async function publishOutputs(uuid, property) {
    let data;
    try {
        data = await publish(uuid, "outputs", property);
    } catch (err) {
        data = { error: err };
        console.log("error", err);
    }
    return data;
};



module.exports = {
    client: require('../lib/atp_redis/atp_things_redis_objects').client,
    subscriber: require('../lib/atp_redis/atp_things_redis_objects').subscriber,
    device: require('./device'),
    module: require('./module'),
    set,
    get,
    getStatus,
    getStatusIsConnected,
    setStatusConnected,
    setStatusDisconnected,
    setCfg,
    setStatus,
    setError,
    publish,
    publishStatus,
    publishError,
    publishInputs,
    publishOutputs,
    getList
}

