
const entities = [
    {
        id: '5oCnKZ',
        type: 'NORMAL',
        details: 'Gå til Meny',
        question: '?',
        answers: [
            {
                id: '7cZHWF',
                answer: ''
            }
        ],
        answerId: '7cZHWF'
    },
    {
        id: 'S0Cl65',
        type: 'NORMAL',
        details: 'Gå til Meny',
        question: '?',
        answers: [
            {
                id: '7cZHWF',
                answer: ''
            }
        ],
        answerId: '7cZHWF'
    },
    {
        id: '9vr7DR',
        type: 'NORMAL',
        details: 'Gå til Meny',
        question: '?',
        answers: [
            {
                id: '7cZHWF',
                answer: ''
            }
        ],
        answerId: '7cZHWF'
    },
    {
        id: 'msNR2Y',
        type: 'NORMAL',
        details: 'Gå til Meny',
        question: '?',
        answers: [
            {
                id: '7cZHWF',
                answer: ''
            }
        ],
        answerId: '7cZHWF'
    }
]

exports.get = (id) => {
    return entities.find(e => e.id == id);
};