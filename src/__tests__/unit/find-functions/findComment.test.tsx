import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"
import {
  findComment,
  findCommentByUsername,
} from "@/utils/comment-functions/findComments"

describe("functions that return a comment string depending on parameters", () => {
  const mockUserArray = [
    { _id: "a1", username: "User1" },
    { _id: "a2", username: "User2" },
    { _id: "a3", username: "User3" },
    { _id: "a4", username: "User4" },
  ] as unknown as User[]
  const mockBookObject = {
    _id: "b1",
    commentInfo: {
      commentId: ["a1", "a4"],
      comments: ["a1commentb1", "a4commentb1"],
    },
  } as unknown as Book

  it("it returns a comment array based on the single book and user data", () => {
    const expectedResultArray = [
      ["User1", "a1commentb1"],
      ["User4", "a4commentb1"],
    ]
    expect(findComment(mockBookObject, mockUserArray)).toStrictEqual(
      expectedResultArray
    )
  })
  it("it returns the initial comment from the user name, book and user data", () => {
    const mockUsername = "User1"
    const expectedComment = "a1commentb1"

    expect(
      findCommentByUsername(mockUsername, mockBookObject, mockUserArray)
    ).toBe(expectedComment)
  })
})
