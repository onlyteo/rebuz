const entities = require('../data/teams.json');

exports.get = (id) => {
    return entities.find(e => e.id == id);
};