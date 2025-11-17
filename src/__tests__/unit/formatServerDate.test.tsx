import { formatServerDate } from "@/utils/time-functions/formatServerDate"

describe("a function to align the server date with the client date", () => {
  const testDate: string =
    "Thu Nov 13 2025 16:25:25 GMT+0100 (Mitteleuropäische Normalzeit)"

  const expectedOutput: string = "13/11/2025, 16:25"

  it("returns a string", () => {
    expect(typeof formatServerDate(testDate)).toBe("string")
  })

  it("formats the date correctly", () => {
    expect(formatServerDate(testDate)).toBe(expectedOutput)
  })

  it("returns a null value", () => {
    // @ts-expect-error
    expect(formatServerDate(13)).toBe(null)
  })
})
