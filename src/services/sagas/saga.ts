import { all,takeEvery } from 'redux-saga/effects';
import { REVERSE } from '../../constants/saga.constants';
import { reverseStringWorker } from './reverse-string.saga';

export function* rootSaga() {
  yield all([
    takeEvery(REVERSE, reverseStringWorker),
  ]);
}