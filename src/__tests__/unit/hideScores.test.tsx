import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"

describe("function that determines whether the scores should be hidden dependant on the date", () => {
  const FAKE_CURRENT_DATE = new Date("2025-11-17T10:00:00.000Z")

  const PAST_DATE = new Date(FAKE_CURRENT_DATE.getTime() - 60000)
  const FUTURE_DATE = new Date(FAKE_CURRENT_DATE.getTime() + 60000)

  beforeAll(() => {
    jest.useFakeTimers()
  })

  beforeEach(() => {
    jest.setSystemTime(FAKE_CURRENT_DATE)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it("returns a boolean value", () => {
    expect(typeof handleHideScores_NoSetter(FAKE_CURRENT_DATE)).toBe("boolean")
  })
  it("it returns false if current date", () => {
    expect(handleHideScores_NoSetter(FAKE_CURRENT_DATE)).toBe(false)
  })
  it("it returns false if past date", () => {
    expect(handleHideScores_NoSetter(PAST_DATE)).toBe(false)
  })
  it("it returns true if date in the future", () => {
    expect(handleHideScores_NoSetter(FUTURE_DATE)).toBe(true)
  })
})
