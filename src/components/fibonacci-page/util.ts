import { MIN_FIBONACCI_COUNT } from "./const";

export const getFibonacciNumbers = (count: number) => {
  const fibonacciArr: number[] = [];
  for (let i = 0; i < count; i++) {
    fibonacciArr.length <= MIN_FIBONACCI_COUNT
      ? fibonacciArr.push(MIN_FIBONACCI_COUNT)
      : fibonacciArr.push(fibonacciArr[i - 2] + fibonacciArr[i - 1]);
  }

  return fibonacciArr;
};
