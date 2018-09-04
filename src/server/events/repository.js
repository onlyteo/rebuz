
const entities = [
    {
        id: 1,
        code: 'A2zXvZ',
        name: 'My Event',
        teams: [1, 2, 3, 4]
    }
]

exports.find = (code) => {
    if (code) {
        return entities.filter(entity => entity.code == code);
    } else {
        return entities;
    }
}

exports.get = (id) => {
    let entity = undefined;

    entities.forEach(e => {
        if (e.id == id) {
            entity = e;
        }
    });

    return entity;
};