export function limitNumberWithinRange(
  num: number,
  min: number,
  max: number) {
  //let parsed = parseInt(num)
  return Math.min(Math.max(num, min), max)
}
