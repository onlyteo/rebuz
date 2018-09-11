import { EventState, initialEventState } from "../../models";
import { FindEventsAction, FindEventsActionType } from "../actions";

export function find(state: EventState = initialEventState, action: FindEventsAction): EventState {
    switch (action.type) {
        case FindEventsActionType.LOADING: {
            return { ...state, loading: action.loading };
        }

        case FindEventsActionType.SUCCESS: {
            return { ...initialEventState, events: action.payload }
        }

        default: {
            return state;
        }
    }
}