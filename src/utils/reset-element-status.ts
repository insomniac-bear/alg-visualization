import { TSortingElement } from "../services/slices/sorting.slice";
import { ElementStates } from "../types/element-states";

export function resetElementsStatus(arr: TSortingElement[], status: ElementStates) {
  const resetArr = arr.map((el) => ({ ...el, state: status}));
  return resetArr;
}