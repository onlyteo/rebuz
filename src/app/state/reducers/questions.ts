import { QuestionState, initialQuestionState } from "../../models";
import { GetQuestionAction, GetQuestionActionType } from "../actions";

export function get(state: QuestionState = initialQuestionState, action: GetQuestionAction): QuestionState {
    switch (action.type) {
        case GetQuestionActionType.LOADING: {
            return { ...state, loading: action.loading };
        }

        case GetQuestionActionType.SUCCESS: {
            return { ...initialQuestionState, question: action.payload }
        }

        default: {
            return state;
        }
    }
}