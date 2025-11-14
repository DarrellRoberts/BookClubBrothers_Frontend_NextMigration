type TimeMilliseconds = {
  [key: string]: number
}

export const TIME_MILLISECONDS: TimeMilliseconds = {
  ONE_MINUTE: 1000 * 60,
  ONE_HOUR: 1000 * 60 * 60,
  ONE_DAY: 1000 * 60 * 60 * 24,
  ONE_MONTH: 1000 * 60 * 60 * 24 * 30,
}
