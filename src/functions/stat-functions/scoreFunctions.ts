import { Book } from "@/types/BookInterface";
import { User } from "@/types/UserInterface";

export const maxScoreFunction = (scoreArr: number[], user: User): string => {
  if (scoreArr && user) {
    const maxScore = Math.max(...scoreArr);
    const maxScoreIndex = scoreArr.indexOf(maxScore);
    const maxScoreBook = user.userInfo?.books?.booksScored[maxScoreIndex];
    return maxScoreBook;
  }
};

export const minScoreFunction = (scoreArr: number[], user: User): string => {
  if (scoreArr && user) {
    const minScore = Math.min(...scoreArr);
    const minScoreIndex = scoreArr.indexOf(minScore);
    const minScoreBook = user.userInfo?.books?.booksScored[minScoreIndex];
    return minScoreBook;
  }
};

export const averageScore = (user: User): string => {
  if (user) {
    const accumulatedScore: number = (user.userInfo?.books?.score?.reduce((a, c) => a + c, 0));
    const freqScore: number = user.userInfo?.books?.score?.length;
    const averageScore = (accumulatedScore/freqScore).toFixed(2);
    return averageScore;
  }
};

export const findMinScoreBook = (bookArr: Book[], scoreArr: number[], userArr: User) => {
  const book = bookArr.find((book) => book._id === minScoreFunction(scoreArr, userArr));
  return book;
};

export const findMaxScoreBook = (bookArr: Book[], scoreArr: number[], userArr: User) => {
  const book = bookArr.find((book) => book._id === maxScoreFunction(scoreArr, userArr));
  return book;
};

export const filterUserReadBooks = (bookArr: Book[], userId: string) => {
  return bookArr.filter((book) => book.scoreRatings.raterId.includes(userId));};

export const filterUserUnreadBooks = (bookArr: Book[], userId: string) => {
  return bookArr.filter((book) => !book.scoreRatings.raterId.includes(userId));};

export const unreadBookTitles = (bookArr: Book[], userId: string): string[] => {
  const unreadBooks = filterUserUnreadBooks(bookArr, userId);
  return unreadBooks.map((book) => book.title);
};

export const userReadBookTitles = (bookArr: Book[], userId: string) => {
  const readBooks = filterUserReadBooks(bookArr, userId);
  return readBooks.map((book) => book.title);
};