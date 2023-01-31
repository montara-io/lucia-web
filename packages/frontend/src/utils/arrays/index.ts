export function arrayAverage(arr: number[], decimals = 2): number {
  console.log(arr);

  if (arr.length === 0) {
    return 0;
  }

  const avg = arr.reduce((acc, curr) => acc + curr, 0) / arr.length;
  console.log(avg);

  return Number(avg.toFixed(decimals));
}
