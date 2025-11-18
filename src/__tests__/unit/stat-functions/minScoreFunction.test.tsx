import { User } from "@/types/UserInterface"
import { minScoreFunction } from "@/utils/stat-functions/scoreFunctions"

describe("a function that returns the highest score from a user", () => {
  it("returns a null when no argument are given", () => {
    // @ts-expect-error
    expect(minScoreFunction()).toBe(null)
  })
  it("returns the book with highest score", () => {
    const mockScoreArray: number[] = [4, 5.5, 3.5, 3, 9]
    const mockUser = {
      userInfo: {
        books: {
          booksScored: ["Book1", "Book2", "Book3", "Book4", "Book5"],
        },
      },
    } as User

    expect(minScoreFunction(mockScoreArray, mockUser)).toBe("Book4")
  })
})
