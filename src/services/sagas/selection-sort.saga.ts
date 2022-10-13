import { delay, put, select } from "redux-saga/effects";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { start, TSortingElement, getSortingArr, setSortingArr, setStatusElement } from "../slices/sorting.slice";
import { swap } from "./swap.saga";
import { Direction } from '../../types/direction';
import { ElementStates } from "../../types/element-states";
import { resetElementsStatus } from "../../utils";

interface IParams { direction: Direction; type: string };

export function* selectionSortWorker(params: IParams) {
  yield put(start(true));
  const arr: TSortingElement[] = yield select(getSortingArr);
  if (arr[0].state === ElementStates.Modified) {
    const tempArr = [ ...resetElementsStatus(arr, ElementStates.Default) ];
    yield put(setSortingArr(tempArr));
  }
  const { length } = arr;

  for (let i = 0; i < length - 1; i++) {
    const currentArrFromState: TSortingElement[] = yield select(getSortingArr);
    let baseIndex = i;
    yield put(setStatusElement({ index: i, status: ElementStates.Changing}));

    for (let j = i + 1; j < length; j++) {
      yield put(setStatusElement({ index: j, status: ElementStates.Changing }));
      if (params.direction === Direction.Ascending) {
        if (currentArrFromState[baseIndex].value > currentArrFromState[j].value) baseIndex = j;
      }
      if (params.direction === Direction.Descending) {
        if (currentArrFromState[baseIndex].value < currentArrFromState[j].value) baseIndex = j;
      }
      yield delay(SHORT_DELAY_IN_MS);
      yield put(setStatusElement({ index: j, status: ElementStates.Default }));
    }
    let tempArr = [ ...currentArrFromState ];

    yield swap<TSortingElement>(tempArr, baseIndex, i, SHORT_DELAY_IN_MS);
    yield put(setSortingArr(tempArr));
    yield put(setStatusElement({ index: i, status: ElementStates.Modified }))
  }
  yield put(setStatusElement({ index: length - 1, status: ElementStates.Modified }))
  yield put(start(false));
}
