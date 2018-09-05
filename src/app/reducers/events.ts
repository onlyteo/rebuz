import { Event } from "../models";
import { EventAction, EventActionType } from "../actions";

export interface EventState {
    events: Event[]
}

export const initialEventState: EventState = {
    events: []
}

export function reducer(state: EventState = initialEventState, action: EventAction) {
    switch (action.type) {
        case EventActionType.GET: {
            return {
                ...state
            }
        }

        case EventActionType.FIND: {
            const events = action.payload

            return {
                ...state,
                events: [...state.events, events]
            }
        }

        default: {
            return state;
        }
    }
}