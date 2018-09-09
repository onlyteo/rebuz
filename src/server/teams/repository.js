
const entities = [
    {
        id: 'ch3x00',
        name: 'Red',
        questions: [
        ]
    },
    {
        id: 'kHcd7G',
        name: 'Blue',
        locations: [
        ]
    },
    {
        id: '8BhSgB',
        name: 'Green',
        questions: [
        ]
    },
    {
        id: 'j0J2bn',
        name: 'Yellow',
        questions: [
        ]
    }
]

exports.get = (id) => {
    return entities.find(e => e.id == id);
};