let Redis = require('ioredis');

class Atp_Things_Redis extends Redis {

    constructor(...args) {
        super(...args);
    }

    // Pub/Sub
    async publishJSON(channel, data) {
        return await this.publish(channel, JSON.stringify(data));
    }
    //TODO: add subscriber

    // redis_subscriber.on('connect', async () => {
    //     await Promise.all(devices_cfg.map(async (device) => {
    //         try {
    //             await redis_subscriber.subscribe("uuid:" + device.identity.uuid + ".outputs");
    //             //TODO: inform about module and devices connected
    //         } catch (err) {
    //             console.log("Send data", err);
    //         }
    //     }));
    // });

    //Set/get
    async setJSON(key, data) {
        return await this.set(key, JSON.stringify(data));//TODO: it succesfulluy writes the value , but return error
    }

    async getJSON(key) {

        const dataString = await this.get(key);
        let data;
        try {
            data = JSON.parse(dataString);
        }
        catch (err) {
            data = dataString;
        }
        return data;
    }

    //hash set
    async hsetJSON(hash, key, data) {
        return await this.hset(hash, key, JSON.stringify(data));
    }

    //Hash get
    async hgetJSON(hash, key) {

        let data = await this.hget(hash, key);
        try {
            data = JSON.parse(data);
        }
        catch (err) {
            data = data;
        }
        return data;
    }
    //Hash get all
    async hgetallJSON(hash) {

        let data = await this.hgetall(hash);

        try {
            Object.keys(data).forEach(async function (k) {
                try {
                    data[k] = JSON.parse(data[k]);
                }
                catch (err) {
                    data[k] = data[k];
                }
            });
        }
        catch (err) {
            data = dataString;
        }
        return data;
    }
}

module.exports = Atp_Things_Redis;

