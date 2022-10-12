import { combineReducers } from 'redux';
import reverse from './revers-string.slice';
import fibonacci from './fibonacci.slice';

export const rootReducer = combineReducers({
  reverse,
  fibonacci,
});
