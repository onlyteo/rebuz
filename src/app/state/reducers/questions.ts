import { QuestionState, initialQuestionState } from "../../models";
import { GetQuestionAction, GetQuestionActionType } from "../actions";

export function get(state: QuestionState = initialQuestionState, action: GetQuestionAction): QuestionState {
    switch (action.type) {
        case GetQuestionActionType.LOADING: {
            const { loading } = action;
            return { ...state, loading: loading };
        }

        case GetQuestionActionType.SUCCESS: {
            const { payload } = action;
            let { questionMap } = state;

            if (payload) {
                const { id: payloadId } = payload;
                questionMap[payloadId] = payload;
            }

            return { ...initialQuestionState, question: payload, questionMap: questionMap };
        }

        case GetQuestionActionType.ERROR: {
            const { error } = action;
            return { ...initialQuestionState, error: error };
        }

        default: {
            return state;
        }
    }
}