import { combineReducers } from 'redux';

import * as events from './events';
import * as teams from './teams';
import * as questions from './questions';
import * as stats from './stats';
import { RootState } from '../../models';

const { reducer: eventsReducer } = events;
const { get: getTeam } = teams;
const { get: getQestion } = questions;
const { find: findStats } = stats;

export const rootReducer = combineReducers<RootState>({
    events: eventsReducer,
    teams: getTeam,
    question: getQestion,
    stats: findStats
});