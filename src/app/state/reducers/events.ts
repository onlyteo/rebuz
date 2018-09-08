import { EventResponse } from "../../models";
import { FindEventsAction, FindEventsActionType } from "../actions";

export interface State {
    loading: boolean
    events: EventResponse[]
}

export const initialState: State = {
    loading: false,
    events: []
}

export function find(state: State = initialState, action: FindEventsAction): State {
    switch (action.type) {
        case FindEventsActionType.LOADING: {
            return { ...state, loading: action.loading };
        }

        case FindEventsActionType.SUCCESS: {
            return { ...initialState, events: action.payload }
        }

        default: {
            return state;
        }
    }
}