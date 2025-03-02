/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/loader/Loader";
import BookCover from "@/components/books/library/BookCover";
import Link from "next/link";
import Search from "@/components/misc/search/Search";
import "@/style/booklibrary.css";
import "@/style/booklibraryRes.css";
import "@/style/search.css";
import "@/style/searchRes.css";
import { Button } from "antd";
import BookImageCover from "@/components/books/library/BookImageCover";
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
import { Book } from "@/types/BookInterface";
import useScrollRef from "@/hooks/scroll-hooks/useScrollRef";
import useLimit from "@/hooks/scroll-hooks/useLimit";

const Booklibrary: React.FC = () => {
  const [searchBar, setSearchBar] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);

  const { limit, handleLimit, setIsLimit, isLimit } = useLimit();

  const { bookData, loadingBooks, error } = useBookFetch(
    `https://bookclubbrothers-backend.onrender.com/books/limit/${limit}`,
    limit
  );

  const readBooks = bookData?.filter((book) => book.read === true);

  const lastItemRef = useScrollRef(loadingBooks, limit, handleLimit);

  const filteredResults = Array.isArray(readBooks)
    ? readBooks?.filter((book) =>
        book.title.toLowerCase().includes(searchBar.toLowerCase())
      )
    : ["No results"];

  useEffect(() => {
    if (!loadingBooks) setBooks(filteredResults);
  }, [searchBar]);

  useEffect(() => {
    if (books.length === 0 && !loadingBooks) setBooks(filteredResults);
    setBooks((prevItems) => [
      ...prevItems,
      ...filteredResults.slice(prevItems.length + 1, limit),
    ]);
    const timer = setTimeout(() => setIsLimit(false), 500);
    return () => clearTimeout(timer);
  }, [limit, loadingBooks]);

  return (
    <>
      <div className="searchBackCon">
        <Search setSearchBar={setSearchBar} filteredBooks={filteredResults} />
        <Link href="/books/library/3d">
          <Button>3D View</Button>
        </Link>
      </div>
      <h1 className="bookLibraryTitle">Book Library</h1>
      {loadingBooks && books.length === 0 ? (
        <Loader screensize="h-screen" />
      ) : error ? (
        <h2> {error?.message}</h2>
      ) : (
        <div className="bookCon flex flex-wrap">
          {books?.length > 0 ? (
            books?.map((book) => (
              <div key={book._id}>
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
                          book?.actualDateOfMeeting
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
                No books found. Clear the search to refresh.
              </p>
            </div>
          )}
        </div>
      )}
      {isLimit ? (
        <Loader screensize="h-100" />
      ) : (
        <div ref={filteredResults.length === limit ? lastItemRef : null}></div>
      )}
    </>
  );
};

export default Booklibrary;
