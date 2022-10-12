import { combineReducers } from 'redux';
import { reverseStringSlice } from './revers-string.slice';

export const rootReducer = combineReducers({
  reverse: reverseStringSlice.reducer,
});
