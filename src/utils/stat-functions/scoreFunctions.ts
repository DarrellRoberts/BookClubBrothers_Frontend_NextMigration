import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"

export const maxScoreFunction = (
  scoreArr: number[],
  user: User
): string | null => {
  if (scoreArr && user) {
    const maxScore = Math.max(...scoreArr)
    const maxScoreIndex = scoreArr.indexOf(maxScore)
    const maxScoreBook = user.userInfo?.books?.booksScored[maxScoreIndex]
    return maxScoreBook
  } else {
    return null
  }
}

export const minScoreFunction = (
  scoreArr: number[],
  user: User
): string | null => {
  if (scoreArr && user) {
    const minScore = Math.min(...scoreArr)
    const minScoreIndex = scoreArr.indexOf(minScore)
    const minScoreBook = user.userInfo?.books?.booksScored[minScoreIndex]
    return minScoreBook
  } else {
    return null
  }
}

export const averageScore = (user: User): number | null => {
  if (user) {
    const accumulatedScore: number = user.userInfo?.books?.score?.reduce(
      (a, c) => a + c,
      0
    )
    const freqScore: number = user.userInfo?.books?.score?.length
    const averageScore: number = accumulatedScore / freqScore
    return averageScore
  } else {
    return null
  }
}

export const findMinScoreBook = (
  bookArr: Book[],
  scoreArr: number[],
  user: User
): Book | null => {
  if (bookArr && scoreArr && user) {
    const book = bookArr?.find(
      (book) => book._id === minScoreFunction(scoreArr, user)
    )
    return book
  } else {
    return null
  }
}

export const findMaxScoreBook = (
  bookArr: Book[],
  scoreArr: number[],
  user: User
): Book | null => {
  if (bookArr && scoreArr && user) {
    const book = bookArr?.find(
      (book) => book._id === maxScoreFunction(scoreArr, user)
    )
    return book
  } else {
    return null
  }
}

export const filterUserReadBooks = (bookArr: Book[], userId: string) => {
  return bookArr?.filter((book) => book.scoreRatings.raterId.includes(userId))
}

export const filterUserUnreadBooks = (bookArr: Book[], userId: string) => {
  return bookArr?.filter((book) => !book.scoreRatings.raterId.includes(userId))
}

export const unreadBookTitles = (bookArr: Book[], userId: string): string[] => {
  const unreadBooks = filterUserUnreadBooks(bookArr, userId)
  return unreadBooks?.map((book) => book.title)
}

export const userReadBookTitles = (bookArr: Book[], userId: string): string[] | null => {
  const readBooks = filterUserReadBooks(bookArr, userId)
  return readBooks?.map((book) => book.title)
}

export const findBestBook = (user: User, bookData: Book[]): string | null => {
  if (user && bookData?.length > 0) {
    const scoreArray: number[] = user.userInfo?.books?.score
    return findMaxScoreBook(bookData, scoreArray, user).title
  } else {
    return null
  }
}

export const findWorstBook = (user: User, bookData: Book[]): string | null => {
  if (user && bookData?.length > 0) {
    const scoreArray: number[] = user.userInfo?.books?.score
    return findMinScoreBook(bookData, scoreArray, user).title
  } else {
    return null
  }
}

export const genreAverageScore = (bookData: Book[], genre: string): number | null => {
  if (bookData?.length > 0) {
    const genreJson: Book[] = bookData?.filter((book) =>
      book.genre[0].includes(genre)
    )
    if (genreJson.length > 0) {
      const totalScoreArray: number[] = genreJson?.map(
        (book) => book.totalScore
      )
      const totalScoreValue: number = totalScoreArray?.reduce(
        (accum, currentValue) => accum + currentValue
      )
      const averageScore: number = totalScoreValue / genreJson.length
      return averageScore
    }
  } else {
    return null
  }
}

export const genreFrequency = (bookData: Book[], genre: string): number => {
  if (bookData?.length > 0) {
    const genreJson: Book[] = bookData?.filter((book) =>
      book.genre[0].includes(genre)
    )
    const genreLength: number = genreJson.length
    return genreLength
  }
}
