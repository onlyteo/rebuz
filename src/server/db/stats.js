const Stats = require('../model/stats');
const utils = require('../core/utils');

exports.init = () => {
}

exports.get = (query, handler) => {
    Stats.findOne(query, handler);
};

exports.find = (query, handler) => {
    Stats.find(query, handler);
};

exports.save = (data, handler) => {
    const timestamp = utils.epochSeconds();
    const dataWithTimestamps = { ...data, created: timestamp, modified: timestamp };
    let stats = new Stats(dataWithTimestamps);
    stats.save(handler);
}

exports.update = (data, handler) => {
    const timestamp = utils.epochSeconds();
    Stats.updateOne(data, { modified: timestamp }, handler);
}

exports.delete = (query, handler) => {
    Stats.deleteMany(query, handler);
}