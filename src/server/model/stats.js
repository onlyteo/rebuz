const mongoose = require('mongoose');
const utils = require('../core/utils');

const Schema = mongoose.Schema;

let StatsSchema = new Schema({
    event: { type: String, required: true },
    team: { type: String, required: true },
    question: { type: String, required: true },
    created: { type: Number, default: utils.epochSeconds() },
    modified: { type: Number, default: utils.epochSeconds() }
});

module.exports = mongoose.model('Stats', StatsSchema);