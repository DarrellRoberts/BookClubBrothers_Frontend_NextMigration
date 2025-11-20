import { Book } from "@/types/BookInterface"
import { findUser } from "../find-functions/find"
import { User } from "@/types/UserInterface"

export const findComment = (
  bookData: Book,
  userData: User[]
): string[][] | null => {
  if (bookData && userData) {
    let commentObj: object = {}
    const commentArray = bookData?.commentInfo?.commentId?.map((id) =>
      findUser(id, userData)
    )
    for (let i = 0; i < commentArray?.length; i++) {
      commentObj[commentArray[i]] = bookData?.commentInfo?.comments[i]
    }
    return Object.entries(commentObj)
  } else {
    return null
  }
}

export const findCommentByUsername = (
  username,
  bookData,
  userData
): string | null => {
  if (bookData && userData) {
    const commentArray = findComment(bookData, userData)
    const result = commentArray?.find((pair) => pair[0] === username)
    if (result) {
      return result[1]
    } else {
      return null
    }
  } else {
    return null
  }
}
