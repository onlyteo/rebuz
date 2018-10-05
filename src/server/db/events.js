const entities = require('../data/events.json');

exports.find = (team) => {
    if (team) {
        return entities.filter(e => e.teams.find(t => t == team));
    } else {
        return [];
    }
}

exports.get = (id) => {
    return entities.find(e => e.id == id);
};