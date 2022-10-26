import { getRandom } from "../../utils/get-random";

export const generateArr = (minValue: number = 0, maxValue: number = 100, minLen: number = 3, maxLen: number = 17) => {
  const arr: string[] = [];
  const arrLength = getRandom(maxLen, minLen);

  for (let i = 0; i <= arrLength - 1; i++) {
    arr.push(`${getRandom(maxValue, minValue)}`);
  }

  return arr;
}