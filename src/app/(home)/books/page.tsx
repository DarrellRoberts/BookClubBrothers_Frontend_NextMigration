/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import "@/style/bookHomepage.css";
import "@/style/bookHomepageRes.css";

const BookHomepage: React.FC = () => {
  return (
    <div className="h-screen">
      <h1 className="booksTitle">The Books</h1>
      <div className="flex justify-center ">
        <div className="bookHomeGrid">
          <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <Link href="/books/library">
              <h2>Book Library</h2>
            </Link>
          </div>

          <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <Link href="/books/randomiser">
              <h2>Book Randomiser</h2>
            </Link>
          </div>

          <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <Link href="/books/quiz">
              <h2>Quiz</h2>
            </Link>
          </div>

          <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <Link href="/books/stats">
              <h2>Book Stats</h2>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookHomepage;
