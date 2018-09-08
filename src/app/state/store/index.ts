import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";

import { RootState } from '../types';
import { rootReducer } from '../reducers';

export const store = createStore<RootState>(rootReducer, applyMiddleware(logger, thunk));

export default store;