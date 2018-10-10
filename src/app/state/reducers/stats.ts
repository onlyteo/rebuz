import { StatsState, initialStatsState } from "../../models";
import { FindStatsAction, FindStatsActionType } from "../actions";

export function find(state: StatsState = initialStatsState, action: FindStatsAction): StatsState {
    switch (action.type) {
        case FindStatsActionType.LOADING: {
            const { loading } = action;
            return { ...state, loading: loading };
        }

        case FindStatsActionType.SUCCESS: {
            const { payload } = action;
            return { ...initialStatsState, stats: payload }
        }

        case FindStatsActionType.ERROR: {
            const { error } = action;
            return { ...initialStatsState, error: error };
        }

        default: {
            return state;
        }
    }
}