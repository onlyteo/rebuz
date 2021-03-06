import { StatsState, initialStatsState } from "../../models";
import { RemoveStatsAction, RemoveStatsActionType, FindStatsAction, FindStatsActionType, StatsAction, SaveStatsAction, SaveStatsActionType } from "../actions";

export function reducer(state: StatsState = initialStatsState, action: StatsAction): StatsState {
    switch (action.type) {
        case FindStatsActionType.LOADING:
        case FindStatsActionType.SUCCESS:
        case FindStatsActionType.ERROR:
            return find(state, action);
        case SaveStatsActionType.LOADING:
        case SaveStatsActionType.SUCCESS:
        case SaveStatsActionType.ERROR:
            return save(state, action);
        case RemoveStatsActionType.LOADING:
        case RemoveStatsActionType.SUCCESS:
        case RemoveStatsActionType.ERROR:
            return remove(state, action);
        default:
            return state;
    }
}

export function find(state: StatsState = initialStatsState, action: FindStatsAction): StatsState {
    switch (action.type) {
        case FindStatsActionType.LOADING: {
            const { loading } = action;
            return { ...state, loading: loading };
        }

        case FindStatsActionType.SUCCESS: {
            const { payload } = action;
            return { ...initialStatsState, stats: payload };
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

export function save(state: StatsState = initialStatsState, action: SaveStatsAction): StatsState {
    switch (action.type) {
        case SaveStatsActionType.LOADING: {
            const { loading } = action;
            return { ...state, loading: loading };
        }

        case SaveStatsActionType.SUCCESS: {
            return state;
        }

        case SaveStatsActionType.ERROR: {
            const { error } = action;
            return { ...initialStatsState, error: error };
        }

        default: {
            return state;
        }
    }
}

export function remove(state: StatsState = initialStatsState, action: RemoveStatsAction): StatsState {
    switch (action.type) {
        case RemoveStatsActionType.LOADING: {
            const { loading } = action;
            return { ...state, loading: loading };
        }

        case RemoveStatsActionType.SUCCESS: {
            return state;
        }

        case RemoveStatsActionType.ERROR: {
            const { error } = action;
            return { ...initialStatsState, error: error };
        }

        default: {
            return state;
        }
    }
}