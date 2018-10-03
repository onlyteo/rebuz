
const entities = [
    {
        id: '5oCnKZ',
        type: 'NORMAL',
        details: 'Gå til Meny',
        question: 'Hvor mange?',
        answers: [
            {
                id: '1',
                answer: '1'
            }
        ],
        answerId: '1'
    },
    {
        id: 'S0Cl65',
        type: 'NORMAL',
        details: 'Gå til yolo',
        question: 'Hvor langt?',
        answers: [
            {
                id: '1',
                answer: '2'
            }
        ],
        answerId: '1'
    },
    {
        id: '9vr7DR',
        type: 'NORMAL',
        details: 'Gå til Meny',
        question: '?',
        answers: [
            {
                id: '1',
                answer: '3'
            }
        ],
        answerId: '1'
    },
    {
        id: 'msNR2Y',
        type: 'NORMAL',
        details: 'Gå til Meny',
        question: '?',
        answers: [
            {
                id: '1',
                answer: '4'
            }
        ],
        answerId: '1'
    }
]

exports.get = (id) => {
    return entities.find(e => e.id == id);
};