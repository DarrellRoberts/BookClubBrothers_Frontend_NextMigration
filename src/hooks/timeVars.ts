type TimeMilliseconds = {
  [key: string]: number
}

export const TIME_MILLISECONDS: TimeMilliseconds = {
  ONE_MINUTE: 1000 * 60,
  FIVE_MINUTES: 1000 * 60 * 5,
  TWENTY_MINUTES: 1000 * 60 * 20,
  ONE_HOUR: 1000 * 60 * 60,
  ONE_DAY: 1000 * 60 * 60 * 24,
  ONE_MONTH: 1000 * 60 * 60 * 24 * 30,
}
