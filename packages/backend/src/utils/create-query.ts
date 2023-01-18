export function createQuery<T>(data: T) {
  return Object.entries(data).reduce((accum, entry) => `${accum}&${entry[0]}=${entry[1]}`, '')
}
