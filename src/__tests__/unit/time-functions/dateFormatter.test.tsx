import { dateFormatter } from "@/utils/time-functions/dateFormatter"

describe("Date Formatter Function", () => {
  const testDate: string =
    "Thu Nov 13 2025 16:25:25 GMT+0100 (Mitteleuropäische Normalzeit)"

  const expectedOutput = "Thu 13 Nov 2025"

  it("returns a string", () => {
    expect(typeof dateFormatter(testDate)).toBe("string")
  })

  it("it returns the expected output", () => {
    expect(dateFormatter(testDate)).toBe(expectedOutput)
  })

  it("returns 'Invalid Date' output for non-date strings or objects", () => {
    expect(dateFormatter("totally-not-a-date")).toContain("undefined")
    // @ts-expect-error
    expect(dateFormatter({})).toContain("Invalid date value")
    // @ts-expect-error
    expect(dateFormatter([])).toContain("Invalid date value")
  })
})
