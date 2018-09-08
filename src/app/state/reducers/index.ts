import { combineReducers } from 'redux';

import * as events from './events';
import { RootState } from '../types';

export const rootReducer = combineReducers<RootState>({
    events: events.find
});