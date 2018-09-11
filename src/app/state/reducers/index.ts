import { combineReducers } from 'redux';

import * as events from './events';
import * as teams from './teams';
import * as questions from './questions';
import { RootState } from '../../models';

export const rootReducer = combineReducers<RootState>({
    events: events.find,
    teams: teams.get,
    question: questions.get
});