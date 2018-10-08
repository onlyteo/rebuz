import { StatsState, initialStatsState } from "../../models";
import { FindStatsAction, FindStatsActionType } from "../actions";

export function find(state: StatsState = initialStatsState, action: FindStatsAction): StatsState {
    switch (action.type) {
        case FindStatsActionType.LOADING: {
            return { ...state, loading: action.loading };
        }

        case FindStatsActionType.SUCCESS: {
            return { ...initialStatsState, stats: action.payload }
        }

        default: {
            return state;
        }
    }
}