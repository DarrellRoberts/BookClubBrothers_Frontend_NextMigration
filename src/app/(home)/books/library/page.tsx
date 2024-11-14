/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect, useState } from "react";
import Loader from "../../../../components/loader/Loader";
import BookCover from "./BookCover";
import Link from "next/link";
import Search from "../../../../components/misc/search/Search";
import "../../../../style/booklibrary.css";
import "../../../../style/booklibraryRes.css";
import "../../../../style/search.css";
import "../../../../style/searchRes.css";
import { Button } from "antd";
import BookImageCover from "./BookImageCover";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import { type Book } from "@/types/BookInterface";

const Booklibrary: React.FC = () => {
  const [bookData, setBookData] = useState<Array<Book>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchBar, setSearchBar] = useState<string>("");

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
          {filteredResults.length > 0 ? (
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
                    <div className="bookCoverCon">
                      <BookCover
                        title={book?.title}
                        totalScore={book?.totalScore}
                        ratingArr={book?.scoreRatings?.rating}
                        raterArr={book?.scoreRatings?.raterId}
                        hideScores={handleHideScores_NoSetter(
                          book?.dateOfMeeting
                        )}
                      />
                    </div>
                  </Link>
                )}
              </div>
            ))
          ) : (
            <div className="h-screen">
              <p className="ml-5">
                No books found. Press search two times to refresh.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Booklibrary;
