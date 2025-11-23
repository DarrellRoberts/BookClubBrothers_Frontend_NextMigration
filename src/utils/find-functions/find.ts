import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"

export const findUser = (id: string, userData: User[]): string => {
  const user = userData?.find((user) => user._id === id)
  return user ? user.username : "user not found"
}

export const findUserByUsername = (
  username: string,
  userData: User[]
): User | string => {
  const user = userData?.find((user) => user.username === username)
  return user ? user : "user not found"
}

export const findBook = (id: string, bookData: Book[]): string | null => {
  if (bookData?.length > 0) {
    const book = bookData?.find((book) => book._id === id)
    return book ? book.title : "book not found"
  } else {
    return null
  }
}

export const findDateOfMeeting = (title: string, bookData: Book[]): string => {
  const book = bookData?.find((book) => book.title === title)
  return book ? book.actualDateOfMeeting : "book not found"
}
