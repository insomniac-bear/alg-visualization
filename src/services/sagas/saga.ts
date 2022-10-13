import { all,takeEvery } from 'redux-saga/effects';
import { REVERSE, FIBONACCI, SELECTION_SORT } from '../../constants/saga.constants';
import { createFibonacciWorker } from './fibonacci.saga';
import { reverseStringWorker } from './reverse-string.saga';
import { selectionSortWorker } from './selection-sort.saga';

export function* rootSaga() {
  yield all([
    takeEvery(REVERSE, reverseStringWorker),
    takeEvery(FIBONACCI, createFibonacciWorker),
    takeEvery(SELECTION_SORT, selectionSortWorker),
  ]);
}