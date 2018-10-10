const Stats = require('../model/stats');

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
    let milliseconds = (new Date).getTime();
    Stats.updateOne(data, { modified: milliseconds }, handler);
}