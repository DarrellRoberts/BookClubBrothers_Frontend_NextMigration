import { Book } from "@/types/BookInterface"
import {
  genreAverageScore,
  genreFrequency,
} from "@/utils/stat-functions/scoreFunctions"

describe("functions that return the book scores by genre", () => {
  const mockBookArray = [
    {
      id: 1,
      genre: [["Horror"]],
      totalScore: 8,
    },
    {
      id: 2,
      genre: [["Thriller"]],
      totalScore: 5,
    },
    {
      id: 3,
      genre: [["Comedy"]],
      totalScore: 4,
    },
    {
      id: 4,
      genre: [["Horror"]],
      totalScore: 3,
    },
  ] as unknown as Book[]
  const mockGenre = "Horror"
  it("it returns null when no value given", () => {
    // @ts-expect-error
    expect(genreAverageScore()).toBe(null)
    // @ts-expect-error
    expect(genreFrequency()).toBe(null)
  })
  it("it returns correct average score for chosen genre", () => {
    const expectedAverage = 5.5
    expect(genreAverageScore(mockBookArray, mockGenre)).toBe(expectedAverage)
  })
  it("it returns the length of genre array according to the genre", () => {
    const expectedLength = 2
    expect(genreFrequency(mockBookArray, mockGenre)).toBe(expectedLength)
  })
})
