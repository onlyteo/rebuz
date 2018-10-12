export enum QuestionType {
    NORMAL = 'NORMAL',
    ALTERNATIVES = 'ALTERNATIVES',
    MULTIPLE_CHOICE = 'MULTIPLE_CHOICE'
}

export interface Answer {
    id: string,
    answer: string
}

export interface Question {
    id: string,
    type: QuestionType,
    details?: string,
    question: string,
    answers: Answer[],
    answerId: string
}

export interface QuestionState {
    loading: boolean;
    question?: Question;
    questionMap: any;
    error?: any;
}

export const initialQuestionState: QuestionState = {
    loading: false,
    questionMap: {}
}