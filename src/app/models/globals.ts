import { EventState, initialEventState, initialTeamState, TeamState } from ".";

export interface RootState {
    events: EventState;
    teams: TeamState;
}

export const initialState: RootState = {
    events: initialEventState,
    teams: initialTeamState
}