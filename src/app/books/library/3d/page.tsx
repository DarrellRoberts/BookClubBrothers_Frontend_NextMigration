/* eslint-disable react/react-in-jsx-scope */
import Base from "./threeJS/Base";
import Layout from "./layout";

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
    <Layout>
      <Base readBooks={readBooks} readIds={readIds} />
    </Layout>
  );
};

export default Homepage;
