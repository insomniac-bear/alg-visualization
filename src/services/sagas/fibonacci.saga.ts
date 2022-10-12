import { delay, put, select } from 'redux-saga/effects';
import { SHORT_DELAY_IN_MS } from '../../constants/delays';
import { getFibonacciRange, setRange, start, TFibonacci } from '../slices/fibonacci.slice';

type TParams = { toNumber: number; type: string };

export function* createFibonacciWorker(params: TParams) {
  const { toNumber } = params;

  yield put(start(true));
  yield put(setRange([{ id: 0, value: 1 }]));

  let arrOfFibonacci: TFibonacci[] = [];

  yield delay(SHORT_DELAY_IN_MS);

  for (let i = 1; i <= toNumber; i++) {
    if (i < 2) {
      const arrFromState: TFibonacci[] = yield select(getFibonacciRange);
      arrOfFibonacci = [ ...arrFromState ];
      arrOfFibonacci.push({ id: 1, value: 1 });
      yield put(setRange(arrOfFibonacci));

      yield delay(SHORT_DELAY_IN_MS);
    } else {
      const arrFromState: TFibonacci[] = yield select(getFibonacciRange);
      arrOfFibonacci = [ ...arrFromState ];
      arrOfFibonacci.push({ id: i, value: arrOfFibonacci[i - 1].value + arrOfFibonacci[i - 2].value });
      yield put(setRange(arrOfFibonacci));

      yield delay(SHORT_DELAY_IN_MS);
    }
  }
  yield put(start(false));
};
