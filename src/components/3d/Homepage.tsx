/* eslint-disable react/react-in-jsx-scope */
import Base from "./threeJS/Base";

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
  const readBooksJson = books
    ?.filter((book) => book.read === true)
    .reverse();
  const readBooks = books
    ?.filter((book) => book.read === true)
    .map((book) => book._id)
    .reverse();
  // eslint-disable-next-line prefer-const
  let readIds = [...readBooks];
  readIds.length = 5;
  return (
    <Base
      readBooks={readBooks}
      readIds={readIds}
      readBooksJson={readBooksJson}
    />
  );
};

export default Homepage;
