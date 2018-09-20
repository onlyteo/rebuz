import { Event, EventState, initialEventState, initialTeamState, initialQuestionState, Question, QuestionState, Team, TeamState } from ".";

export interface RootState {
    events: EventState;
    teams: TeamState;
    question: QuestionState;
    selectedEvent?: Event;
    selectedTeam?: Team;
    selectedQuestion?: Question;
}

export const initialState: RootState = {
    events: initialEventState,
    teams: initialTeamState,
    question: initialQuestionState
}