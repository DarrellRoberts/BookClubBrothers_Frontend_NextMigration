import { getTime } from "@/utils/time-functions/getTime"

describe("it returns a different string dependant on the time", () => {
  it("returns a string", () => {
    expect(typeof getTime()).toBe(typeof "string")
  })

  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  it("returns 'Good Morning' for exactly 4:00 AM (04:00)", () => {
    jest.setSystemTime(new Date("2025-11-17T04:00:00.000Z"))
    expect(getTime()).toBe("Good Morning")
  })

  it("returns 'Good Afternoon' for exactly 12:00 PM (12:00)", () => {
    jest.setSystemTime(new Date("2025-11-17T12:00:00.000Z"))
    expect(getTime()).toBe("Good Afternoon")
  })

  it("returns 'Good Evening' for exactly 5:00 PM (17:00)", () => {
    jest.setSystemTime(new Date("2025-11-17T17:00:00.000Z"))
    expect(getTime()).toBe("Good Evening")
  })

  it("returns 'It's quite late,' for exactly 10:00 PM (22:00)", () => {
    jest.setSystemTime(new Date("2025-11-17T22:00:00.000Z"))
    expect(getTime()).toBe("It's quite late,")
  })
})
