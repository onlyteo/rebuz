
const entities = [
    {
        id: 1,
        name: '',
        description: '',
        question: 'My Event',
        alternatives: [
            {
                id: 1,
                answer: ''
            }
        ],
        answer: 1
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