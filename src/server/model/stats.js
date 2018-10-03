const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StatsSchema = new Schema({
    team: { type: String, required: true },
    questions: { type: [String], required: true }
});

module.exports = mongoose.model('Stats', StatsSchema);