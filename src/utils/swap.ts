export function* swap<T>(array: T[], i: number, j: number) {
  const params = {
    [i]: array[j],
    [j]: array[i]
  };

  let temp = array[i];
  array[i] = array[j];
  array[j] = temp;

  yield params;
}
