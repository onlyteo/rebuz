import { combineReducers } from 'redux';

import * as events from './events';

export interface RootState {
    events: events.State
}

export const initialState: RootState = {
    events: events.initialState
}

export const rootReducer = combineReducers<RootState>({
    events: events.find
});

export default rootReducer;