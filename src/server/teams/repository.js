
const entities = [
    {
        id: 1,
        code: 'ch3x00',
        name: 'Red',
        locations: [
        ]
    },
    {
        id: 2,
        code: 'kHcd7G',
        name: 'Blue',
        locations: [
        ]
    },
    {
        id: 3,
        code: '8BhSgB',
        name: 'Green',
        locations: [
        ]
    },
    {
        id: 4,
        code: 'j0J2bn',
        name: 'Yellow',
        locations: [
        ]
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