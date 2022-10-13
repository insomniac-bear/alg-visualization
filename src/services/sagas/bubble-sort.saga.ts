import { delay, put, select } from "redux-saga/effects";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { resetElementsStatus } from "../../utils";
import { getSortingArr, setSortingArr, setStatusElement, start, TSortingElement } from "../slices/sorting.slice";
import { swap } from "./swap.saga";

interface IParams { direction: Direction; type: string };

export function* bubbleSort(params: IParams) {
  yield put(start(true));
  const arr: TSortingElement[] = yield select(getSortingArr);
  if (arr[0].state === ElementStates.Modified) {
    const tempArr = [ ...resetElementsStatus(arr, ElementStates.Default) ];
    yield put(setSortingArr(tempArr));
  }

  const { length } = arr;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      const currentArrFromState: TSortingElement[] = yield select(getSortingArr);
      const tempArr = [ ...currentArrFromState ];

      yield put(setStatusElement({ index: j, status: ElementStates.Changing }));
      yield put(setStatusElement({ index: j + 1, status: ElementStates.Changing }));
      yield delay(SHORT_DELAY_IN_MS);

      if (params.direction === Direction.Ascending) {
        if (tempArr[j].value > tempArr[j + 1].value) {
          yield swap(tempArr, j, j + 1, SHORT_DELAY_IN_MS);
        };
      }
      if (params.direction === Direction.Descending) {
        if (tempArr[j].value < tempArr[j + 1].value) {
          yield swap(tempArr, j, j + 1, SHORT_DELAY_IN_MS);
        }
      }

      yield put(setSortingArr(tempArr));
    }
    yield put(setStatusElement({ index: length - i - 1, status: ElementStates.Modified }));
  }

  yield put(start(false));
};
