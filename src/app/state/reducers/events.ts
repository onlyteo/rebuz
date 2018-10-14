import { EventState, initialEventState } from "../../models";
import { EventAction, GetEventAction, GetEventActionType, FindEventsAction, FindEventsActionType } from "../actions";

export function reducer(state: EventState = initialEventState, action: EventAction): EventState {
    switch (action.type) {
        case GetEventActionType.LOADING:
        case GetEventActionType.SUCCESS:
        case GetEventActionType.ERROR:
            return get(state, action);
        case FindEventsActionType.LOADING:
        case FindEventsActionType.SUCCESS:
        case FindEventsActionType.ERROR:
            return find(state, action);
        default:
            return state;
    }
}

export function get(state: EventState = initialEventState, action: GetEventAction): EventState {
    switch (action.type) {
        case GetEventActionType.LOADING: {
            const { loading } = action;
            return { ...state, loading: loading };
        }

        case GetEventActionType.SUCCESS: {
            const { payload } = action;
            let { events, eventMap } = state;

            if (payload) {
                const { id: payloadId } = payload;
                const event = events.find(event => event.id === payloadId);
                if (!event) {
                    events = events.concat(payload);
                }
                eventMap[payload.id] = payload;
            }

            return { ...initialEventState, events: events, eventMap: eventMap };
        }

        case GetEventActionType.ERROR: {
            const { error } = action;
            return { ...initialEventState, error: error };
        }

        default: {
            return state;
        }
    }
}

export function find(state: EventState = initialEventState, action: FindEventsAction): EventState {
    switch (action.type) {
        case FindEventsActionType.LOADING: {
            const { loading } = action;
            return { ...state, loading: loading };
        }

        case FindEventsActionType.SUCCESS: {
            const { payload } = action;
            let { events, eventMap } = state;
            if (payload) {
                payload.forEach(event => {
                    let index = events.indexOf(event);
                    if (~index) {
                        events[index] = event;
                    } else {
                        events = events.concat(payload);
                    }
                    eventMap[event.id] = event
                });
            }
            return { ...initialEventState, events: payload, eventMap: eventMap };
        }

        case FindEventsActionType.ERROR: {
            const { error } = action;
            return { ...initialEventState, error: error };
        }

        default: {
            return state;
        }
    }
}