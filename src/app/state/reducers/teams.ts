import { TeamState, initialTeamState } from "../../models";
import { GetTeamAction, GetTeamActionType } from "../actions";

export function get(state: TeamState = initialTeamState, action: GetTeamAction): TeamState {
    switch (action.type) {
        case GetTeamActionType.LOADING: {
            const { loading } = action;
            return { ...state, loading: loading };
        }

        case GetTeamActionType.SUCCESS: {
            const { payload } = action;
            let { teams, teamMap } = state;

            if (payload) {
                let index = teams.indexOf(payload);
                if (~index) {
                    teams[index] = payload;
                } else {
                    teams = teams.concat(payload);
                }
                teamMap[payload.id] = payload;
            }

            return { ...initialTeamState, teams: teams, teamMap: teamMap };
        }

        case GetTeamActionType.ERROR: {
            const { error } = action;
            return { ...initialTeamState, error: error };
        }

        default: {
            return state;
        }
    }
}