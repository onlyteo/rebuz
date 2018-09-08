import * as events from '../reducers/events';

export interface RootState {
    events: events.State
}

export const initialState: RootState = {
    events: events.initialState
}