
const entities = [
    {
        id: '5oCnKZ',
        details: 'Gå til Meny',
        question: '?',
        type: 'NORMAL',
        answers: [
            {
                id: '7cZHWF',
                answer: ''
            }
        ],
        answer: '7cZHWF'
    },
    {
        id: 'S0Cl65',
        details: 'Gå til Meny',
        question: '?',
        type: 'NORMAL',
        answers: [
            {
                id: '7cZHWF',
                answer: ''
            }
        ],
        answer: '7cZHWF'
    },
    {
        id: '9vr7DR',
        details: 'Gå til Meny',
        question: '?',
        type: 'NORMAL',
        answers: [
            {
                id: '7cZHWF',
                answer: ''
            }
        ],
        answer: '7cZHWF'
    },
    {
        id: 'msNR2Y',
        details: 'Gå til Meny',
        question: '?',
        type: 'NORMAL',
        answers: [
            {
                id: '7cZHWF',
                answer: ''
            }
        ],
        answer: '7cZHWF'
    }
]

exports.get = (id) => {
    return entities.find(e => e.id == id);
};