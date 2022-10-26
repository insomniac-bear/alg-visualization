import { IArrElement } from "../types/arr-element";
import { ElementStates } from "../types/element-states";
import { getRandom } from "./get-random";

export const generateArr = (minValue: number = 0, maxValue: number = 100, minLen: number = 3, maxLen: number = 17) => {
  const arr: IArrElement<number>[] = [];
  const arrLength = getRandom(maxLen, minLen);

  for (let i = 0; i <= arrLength - 1; i++) {
    arr.push({
      value: getRandom(maxValue, minValue),
      state: ElementStates.Default,
    });
  }

  return arr;
}