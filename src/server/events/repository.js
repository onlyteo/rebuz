
const entities = [
    {
        id: 'A2zXvZ',
        name: 'Målfrid\'s rebuz',
        teams: [
            'ch3x00',
            'kHcd7G',
            '8BhSgB',
            'j0J2bn'
        ]
    }
]

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