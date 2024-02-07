import { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import BookCover from "./BookCover";
import { Link } from "react-router-dom";
import Back from "../../misc/Back";
import Search from "../../misc/Search";
import CreateBook from "./bookform/CreateBook";
import {Button} from "antd";
import "../../../style/booklibrary.css";
import "../../../style/booklibraryRes.css";
import "../../../style/search.css";
import "../../../style/searchRes.css";

const Booklibrary: React.FC = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")
  const [searchBar, setSearchBar] = useState(""); 
  const [showCreateBook, setShowCreateBook] = useState(false)


  const getBookData = async () => {
    try {
    if (searchBar) {
    setError(null)
    const data = await fetch(
      `https://bookclubbrothers-backend.onrender.com/books/title/${searchBar}`
    );
    const book = await data.json();
    setBookData(book);
    setLoading(false);
    } else {
    const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/books`
    );
    const book = await data.json();
    setBookData(book);
    setLoading(false);
    }
  } catch (err) {
    setError(err)
    console.log(error)
  }
  };

  useEffect(() => {
    getBookData();
  }, []);
 
  const filteredResults = Array.isArray(bookData)
      ? bookData?.filter((book) => book.title.includes(searchBar) && book.read === true)
      : ["No results"];
console.log(bookData)
  return (
    <>
    <div className="searchBackCon">
    <Search setSearchBar={setSearchBar} />
    <Back />
    </div>
    <h1 className="bookLibraryTitle">Book Library</h1>
      {loading && bookData.length <= 0 ? (
        <Loader />
      ) : (
        <div className="bookCon flex flex-wrap">
          {Array.isArray(bookData) ? 
          filteredResults.length > 0 ?
          (
          filteredResults?.map((book) => (
            <div key={book.id}>
              {book.reviewImageURL ? (
                <Link to={`/books/library/${book._id}`}>
                  <h2 className="smallBookTitle">{book.title}</h2>
                  <img
                    src={book.reviewImageURL}
                    alt="book_review_image"
                    width=""
                    height=""
                    className="border-black border-4 border-black border-solid m-5"
                  />
                </Link>
              ) : (
                <Link to={`/books/library/${book._id}`}>
                  <h2 className="smallBookTitle">{book.title}</h2>
                  <div className="bookCoverCon flex justify-center text-center items-center border-4 m-5 border-black border-solid">
                    <BookCover
                      title={book?.title}
                      totalScore={book?.totalScore}
                      ratingArr={book?.scoreRatings?.rating}
                      raterArr={book?.scoreRatings?.raterId}
                    />
                  </div>
                </Link>
              )}
            </div>
          ))
          ) : (
            <p className="text-center w-screen">No books found. Press search again to refresh.</p>
          ) : (
            <p className="text-center w-screen">No books found. Press search again to refresh.</p>
          )}
        </div>
      )}
                <div className="addBookCon">
          <Button
          onClick={() => setShowCreateBook(true)}>
          Add book
          </Button>
          {showCreateBook ? (
          <CreateBook setShowCreateBook={setShowCreateBook} showCreateBook={showCreateBook}/>
          ) : null}
          </div>
    </>
  );
};

export default Booklibrary;
