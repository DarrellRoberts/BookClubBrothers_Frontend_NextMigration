import { Book } from "@/types/BookInterface"
import { findBook, findDateOfMeeting } from "@/utils/find-functions/find"

describe("book functions that return a key value given its parameters", () => {
  const mockBookArray = [
    {
      _id: "b1",
      title: "Book1",
      actualDateOfMeeting:
        "Thu Nov 20 2025 15:56:20 GMT+0100 (Mitteleuropäische Normalzeit)",
    },
    {
      _id: "b2",
      title: "Book2",
      actualDateOfMeeting:
        "Thu Nov 19 2025 15:56:20 GMT+0100 (Mitteleuropäische Normalzeit)",
    },
    {
      _id: "b3",
      title: "Book3",
      actualDateOfMeeting:
        "Thu Nov 18 2025 15:56:20 GMT+0100 (Mitteleuropäische Normalzeit)",
    },
    {
      _id: "b4",
      title: "Book4",
      actualDateOfMeeting:
        "Thu Nov 17 2025 15:56:20 GMT+0100 (Mitteleuropäische Normalzeit)",
    },
  ] as unknown as Book[]

  it("it returns the book title given its id", () => {
    const id = "b4"
    const expectedBookTitle = "Book4"
    expect(findBook(id, mockBookArray)).toBe(expectedBookTitle)
  })
  it("it returns the book's date of meeting given its title", () => {
    const bookTitle = "Book4"
    const expectedDateOfMeeting =
      "Thu Nov 17 2025 15:56:20 GMT+0100 (Mitteleuropäische Normalzeit)"
    expect(findDateOfMeeting(bookTitle, mockBookArray)).toBe(
      expectedDateOfMeeting
    )
  })
})
