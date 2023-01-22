export function arrayAverage(arr: number[]) {
  return arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
}
