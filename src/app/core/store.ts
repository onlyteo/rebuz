import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from "redux-thunk";

import { RootState, rootReducer } from '../reducers';

const store = createStore<RootState>(rootReducer, applyMiddleware(logger, thunk));

export default store;