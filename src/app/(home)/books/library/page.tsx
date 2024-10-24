/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect, useState } from "react";
import Loader from "../../../../components/loader/Loader";
import BookCover from "./BookCover";
import Link from "next/link";
import Search from "../../../../components/misc/Search";
import "../../../../style/booklibrary.css";
import "../../../../style/booklibraryRes.css";
import "../../../../style/search.css";
import "../../../../style/searchRes.css";
import { Button } from "antd";
import BookImageCover from "./BookImageCover";

const Booklibrary: React.FC = () => {
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchBar, setSearchBar] = useState("");

  const getBookData = async () => {
    try {
      if (searchBar) {
        setError(null);
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
      setError(err);
      console.log(error);
    }
  };

  useEffect(() => {
    getBookData();
  }, []);

  //filtering data to show only read books
  const filteredResults = Array.isArray(bookData)
    ? bookData?.filter(
      (book) => book.title.includes(searchBar) && book.read === true
    )
    : ["No results"];
  return (
    <>
      <div className="searchBackCon">
        <Search setSearchBar={setSearchBar} />
        <Link href="/books/library/3d">
          <Button>3D View</Button>
        </Link>
      </div>
      <h1 className="bookLibraryTitle">Book Library</h1>
      {loading && bookData.length <= 0 ? (
        <Loader />
      ) : (
        <div className="bookCon flex flex-wrap">
          {Array.isArray(bookData) ? (
            filteredResults.length > 0 ? (
              filteredResults?.map((book) => (
                <div key={book.id}>
                  {book.reviewImageURL ? (
                    <Link href={`/books/library/${book._id}`}>
                      <BookImageCover
                        title={book?.title}
                        imageURL={book?.reviewImageURL}
                      />
                    </Link>
                  ) : (
                    <Link href={`/books/library/${book._id}`}>
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
              <p className="text-center w-screen">
                No books found. Press search again to refresh.
              </p>
            )
          ) : (
            <p className="text-center w-screen">
              No books found. Press search again to refresh.
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Booklibrary;
