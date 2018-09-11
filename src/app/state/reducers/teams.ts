import { TeamState, initialTeamState } from "../../models";
import { GetTeamAction, GetTeamActionType } from "../actions";

export function get(state: TeamState = initialTeamState, action: GetTeamAction): TeamState {
    switch (action.type) {
        case GetTeamActionType.LOADING: {
            return { ...state, loading: action.loading };
        }

        case GetTeamActionType.SUCCESS: {
            const { teams } = state;
            const { payload } = action;

            let updatedTeams = teams;
            let index = updatedTeams.indexOf(payload);
            if (~index) {
                updatedTeams[index] = payload;
            } else {
                updatedTeams = updatedTeams.concat(payload);
            }

            return { ...initialTeamState, teams: updatedTeams }
        }

        default: {
            return state;
        }
    }
}