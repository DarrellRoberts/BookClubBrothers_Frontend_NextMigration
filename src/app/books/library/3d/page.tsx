/* eslint-disable react/react-in-jsx-scope */
import Base from "./threeJS/Base";
import style from "./3d.module.css";

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
  let readIds = readBooks.map((book) => book._id);
  readIds = readIds.reverse();
  return (
    <html className={style.noScroll}>
      <Base readBooks={readBooks} readIds={readIds} />
    </html>
  );
};

export default Homepage;
