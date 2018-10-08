import { TeamState, initialTeamState } from "../../models";
import { GetTeamAction, GetTeamActionType } from "../actions";

export function get(state: TeamState = initialTeamState, action: GetTeamAction): TeamState {
    switch (action.type) {
        case GetTeamActionType.LOADING: {
            return { ...state, loading: action.loading };
        }

        case GetTeamActionType.SUCCESS: {
            let { teams } = state;
            const { payload } = action;

            if (payload) {
                let index = teams.indexOf(payload);
                if (~index) {
                    teams[index] = payload;
                } else {
                    teams = teams.concat(payload);
                }
            }

            return { ...initialTeamState, teams: teams }
        }

        default: {
            return state;
        }
    }
}