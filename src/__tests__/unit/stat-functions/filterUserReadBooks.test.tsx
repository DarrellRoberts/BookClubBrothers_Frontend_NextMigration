import { Book } from "@/types/BookInterface"
import {
  filterUserReadBooks,
  filterUserUnreadBooks,
} from "@/utils/stat-functions/scoreFunctions"

describe("tests if function returns an array of books", () => {
  const mockUserId: string = "aaa"
  const expectedResultRead = [
    {
      _id: 1,
      scoreRatings: {
        raterId: ["aaa"],
      },
    },
  ]
  const expectedResultUnread = [
    {
      _id: 2,
      scoreRatings: {
        raterId: ["bbb"],
      },
    },
  ]
  const mockBookArray = [
    {
      _id: 1,
      scoreRatings: {
        raterId: ["aaa"],
      },
    },
    {
      _id: 2,
      scoreRatings: {
        raterId: ["bbb"],
      },
    },
  ] as unknown as Book[]
  it("returns array that includes userId", () => {
    expect(filterUserReadBooks(mockBookArray, mockUserId)).toStrictEqual(
      expectedResultRead
    )
  })
  it("returns array that doesn't include userId", () => {
    expect(filterUserUnreadBooks(mockBookArray, mockUserId)).toStrictEqual(
      expectedResultUnread
    )
  })
})
