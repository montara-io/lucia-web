export function arrayAverage(arr: number[], decimals = 2): number {
  if (arr.length === 0) {
    return 0;
  }

  const avg = arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
  return Number(avg.toFixed(decimals));
}
