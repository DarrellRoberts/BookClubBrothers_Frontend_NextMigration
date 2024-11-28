/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState } from "react";
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
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";

const Booklibrary: React.FC = () => {
  const [searchBar, setSearchBar] = useState<string>("");

  const { bookData, loadingBooks, error } = useBookFetch(
    `https://bookclubbrothers-backend.onrender.com/books/${searchBar}`,
    searchBar
  );

  const readBooks = bookData?.filter((book) => book.read === true);

  return (
    <>
      <div className="searchBackCon">
        <Search setSearchBar={setSearchBar} />
        <Link href="/books/library/3d">
          <Button>3D View</Button>
        </Link>
      </div>
      <h1 className="bookLibraryTitle">Book Library</h1>
      {loadingBooks ? (
        <Loader />
      ) : error ? (
        <h2> {error?.message}</h2>
      ) : (
        <div className="bookCon flex flex-wrap">
          {readBooks?.length > 0 ? (
            readBooks?.map((book) => (
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
