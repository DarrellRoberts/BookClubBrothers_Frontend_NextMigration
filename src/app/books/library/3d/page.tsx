/* eslint-disable react/react-in-jsx-scope */
import ThreeScene from "./threeJS/Base";

async function getBookData() {
  const response = await fetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    { next: { revalidate: 5 } }
  );
  return response.json();
}

const Homepage: React.FC = async () => {
  const bookPromise = getBookData();
  const books = await bookPromise;
  const readBooks = books.filter((book) => book.read === true);
  const readIds = readBooks.map((book) => book._id);
  return (
    <ThreeScene readBooks={readBooks} readIds={readIds} />
  );
};

export default Homepage;
