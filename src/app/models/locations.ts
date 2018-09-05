export interface Alternative {
    id: number,
    answer: string
}

export interface Location {
    id: number,
    name: string,
    description: string,
    question: string,
    alternatives: Alternative[],
    answer: number
}