import { User } from "@/types/UserInterface"
import { findUser, findUserByUsername } from "@/utils/find-functions/find"

describe("functions that return a key value of a given user", () => {
  const mockUserArray = [
    { _id: "a1", username: "User1" },
    { _id: "a2", username: "User2" },
    { _id: "a3", username: "User3" },
    { _id: "a4", username: "User4" },
  ] as unknown as User[]

  it("it returns the username given the id", () => {
    const userId = "a4"
    const expectedUsername = "User4"
    expect(findUser(userId, mockUserArray)).toBe(expectedUsername)
  })
  it("it returns the user object given the username", () => {
    const username = "User4"
    const expectedObject = { _id: "a4", username: "User4" }
    expect(findUserByUsername(username, mockUserArray)).toStrictEqual(
      expectedObject
    )
  })
})
