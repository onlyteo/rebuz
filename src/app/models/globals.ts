import { EventState, initialEventState, initialTeamState, initialQuestionState, QuestionState, TeamState } from ".";

export interface RootState {
    events: EventState;
    teams: TeamState;
    question: QuestionState;
}

export const initialState: RootState = {
    events: initialEventState,
    teams: initialTeamState,
    question: initialQuestionState
}