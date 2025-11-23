import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"
import {
  findBestBook,
  findMaxScoreBook,
} from "@/utils/stat-functions/scoreFunctions"

describe("a function that returns the highest scored book", () => {
  const mockScoreArray = [4, 5, 6, 3, 7, 8]
  const mockUser = {
    userInfo: {
      books: {
        score: [4, 5, 6, 3, 7, 8],
        booksScored: [1, 2, 3, 4, 5, 6],
      },
    },
  } as unknown as User
  const mockBookArray = [
    { _id: 1, title: "book1" },
    { _id: 2, title: "book2" },
    { _id: 3, title: "book3" },
    { _id: 4, title: "book4" },
    { _id: 5, title: "book5" },
    { _id: 6, title: "book6" },
  ] as unknown as Book[]
  it("returns a null when no argument are given", () => {
    // @ts-expect-error
    expect(findMaxScoreBook()).toBe(null)
  })
  it("returns the book the user scored highest", () => {
    expect(
      findMaxScoreBook(mockBookArray, mockScoreArray, mockUser)
    ).toStrictEqual({
      _id: 6,
      title: "book6",
    })
  })
  it("returns the book title of the user's best scored book", () => {
    expect(findBestBook(mockUser, mockBookArray)).toBe("book6")
  })
})
