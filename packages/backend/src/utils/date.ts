export const dateDiffInMinuts = (startDate: Date, endDate: Date): number => {
  if (!startDate || !startDate) {
    return null
  }

  const diffMs = endDate.getTime() - startDate.getTime()
  return diffMs / 1000 / 60
}
