import { swap } from "../../utils";

export const reversString = (str: string): string => {
  const arrOfLetter = str.split("");
  let start = 0;
  let end = arrOfLetter.length - 1;
  while(start <= end) {
    swap<string>(arrOfLetter, start, end);
    start++;
    end--;
  }

  return arrOfLetter.join("");
};
