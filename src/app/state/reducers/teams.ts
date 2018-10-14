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
                const { id: payloadId } = payload;
                const team = teams.find(team => team.id === payloadId);
                if (!team) {
                    teams = teams.concat(payload);
                }
                teamMap[payloadId] = payload;
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