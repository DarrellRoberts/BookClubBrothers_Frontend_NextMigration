import { Book } from "@/types/BookInterface";

export const getBookData = async (): Promise<Book[]> => {
  try {
    const data = await fetch(
      `https://bookclubbrothers-backend.onrender.com/books`
    );
    const user = await data.json();
    return user;
  } catch (err) {
    console.log(err);
  }
};

const bookPromise = getBookData();
const allBookData = await bookPromise;
export const bookData = allBookData?.filter(book => book.read === true);
