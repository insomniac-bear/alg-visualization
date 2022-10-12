import { delay, put, select } from "redux-saga/effects";
import { DELAY_IN_MS } from "../../constants/delays";
import { swap } from './swap.saga';
import { setActive, setSorted, setSymbols, startReverse, TArrOfSymbols } from '../slices/revers-string.slice';
import { RootState } from "../store";

type TParams = { arr: TArrOfSymbols[]; type: string }

const getArr = (store: RootState) => store.reverse.arrOfSymbols;

export function* reverseStringWorker(params: TParams) {
  yield put(startReverse(true));
  yield put(setSymbols([ ...params.arr ]));

  const arrFromState: TArrOfSymbols[] = yield select(getArr);
  let tempArr = [ ...arrFromState ];

  if (tempArr.length > 1) {
    let start = 0;
    let end = tempArr.length - 1;

    while (start <= end) {
      delay(DELAY_IN_MS);
      yield put(setActive({ start, end }));
      yield swap<TArrOfSymbols>(tempArr, start, end, DELAY_IN_MS);
      yield put(setSymbols(tempArr));
      yield put(setSorted({ start, end }));
      const currentArrFromState: TArrOfSymbols[] = yield select(getArr);
      tempArr = [ ...currentArrFromState ];
      start++;
      end--;
    }
  } else {
    yield put(setSorted({ start: 0, end: 0 }));
  }
  yield put(startReverse(false));
};

