import { User } from "@/types/UserInterface"
import { averageScore } from "@/utils/stat-functions/scoreFunctions"

describe("a function that returns the highest score from a user", () => {
  it("returns a null when no argument are given", () => {
    // @ts-expect-error
    expect(averageScore()).toBe(null)
  })
  it("returns the mean average score", () => {
    const mockUser = {
      userInfo: {
        books: {
          score: [3, 4, 5, 6, 7, 3, 2, 9],
        },
      },
    } as User
    const expectedAverage = 4.875

    expect(averageScore(mockUser)).toBe(expectedAverage)
  })
})
