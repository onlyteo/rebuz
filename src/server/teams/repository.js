
const entities = [
    {
        id: 'ch3x00',
        name: 'Red',
        questions: [
            '5oCnKZ',
            'S0Cl65',
            '9vr7DR',
            'msNR2Y'
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