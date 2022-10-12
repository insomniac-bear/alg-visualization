import { all,takeEvery } from 'redux-saga/effects';
import { REVERSE, FIBONACCI } from '../../constants/saga.constants';
import { createFibonacciWorker } from './fibonacci.saga';
import { reverseStringWorker } from './reverse-string.saga';

export function* rootSaga() {
  yield all([
    takeEvery(REVERSE, reverseStringWorker),
    takeEvery(FIBONACCI, createFibonacciWorker),
  ]);
}