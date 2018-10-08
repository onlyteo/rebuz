import { EventState, initialEventState, initialQuestionState, initialStatsState, initialTeamState, QuestionState, StatsState, TeamState } from ".";

export interface RootState {
    events: EventState;
    teams: TeamState;
    question: QuestionState;
    stats: StatsState;
}

export const initialState: RootState = {
    events: initialEventState,
    teams: initialTeamState,
    question: initialQuestionState,
    stats: initialStatsState
}