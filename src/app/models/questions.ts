export interface Answer {
    id: string,
    answer: string
}

export interface Location {
    id: string,
    name: string,
    description: string,
    question: string,
    answers: Answer[],
    answer: number
}