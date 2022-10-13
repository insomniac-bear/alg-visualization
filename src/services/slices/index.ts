import { combineReducers } from 'redux';
import reverse from './revers-string.slice';
import fibonacci from './fibonacci.slice';
import sorting from './sorting.slice';

export const rootReducer = combineReducers({
  reverse,
  fibonacci,
  sorting,
});
