import { RootState } from '../reducers';
import { createSelector } from 'reselect';

const getEventsState = ((state: RootState) => state.events);

export const getEvents = createSelector([getEventsState], state => state.events);