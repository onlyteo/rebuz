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
    let stats = new Stats(data);
    stats.save(handler);
}

exports.update = (data, handler) => {
    Stats.updateOne(data, { modified: utils.epochSeconds() }, handler);
}

exports.delete = (query, handler) => {
    Stats.deleteMany(query, handler);
}