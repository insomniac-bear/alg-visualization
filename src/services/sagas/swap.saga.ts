import { delay } from 'redux-saga/effects';

export function* swap<T>(array: T[], firstIndex: number, secondIndex: number, delayValue: number) {
  let temp = array[firstIndex];
  array[firstIndex] = array[secondIndex];
  array[secondIndex] = temp;
  yield delay(delayValue);
}
