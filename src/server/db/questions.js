const entities = require('../data/questions.json');

exports.get = (id) => {
    return entities.find(e => e.id == id);
};