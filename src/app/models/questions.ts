export enum QuestionType {
    NORMAL = 'NORMAL',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE'
}

export interface Answer {
    id: string,
    answer: string
}

export interface Question {
    id: string,
    type: QuestionType,
    description?: string,
    question: string,
    answers: Answer[],
    answerId: string
}

export interface QuestionState {
    loading: boolean;
    question?: Question;
    error?: any;
}

export const initialQuestionState: QuestionState = {
    loading: false
}