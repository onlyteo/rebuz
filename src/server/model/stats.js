const mongoose = require('mongoose');
const moment = require('moment');

const Schema = mongoose.Schema;

let StatsSchema = new Schema({
    event: { type: String, required: true },
    team: { type: String, required: true },
    question: { type: String, required: true },
    created: { type: Number, default: moment().unix() },
    modified: { type: Number, default: moment().unix() }
});

module.exports = mongoose.model('Stats', StatsSchema);