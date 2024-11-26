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
// import useFetch from "@/hooks/fetch-hooks/useBookFetch";
import { useQuery } from "@tanstack/react-query";

const Booklibrary: React.FC = () => {
  const [searchBar, setSearchBar] = useState<string>("");

  const { isPending, data } = useQuery({
    queryKey: [""],
    queryFn: () =>
      fetch(
        `https://bookclubbrothers-backend.onrender.com/books/${searchBar}`
      ).then((res) => res.json()),
  });
  // const { bookData, loading } = useFetch(
  //   "https://bookclubbrothers-backend.onrender.com/books",
  //   searchBar,
  //   true
  // );

  //filtering data to show only read books
  const readBooks = data?.filter((book) => book.read === true);

  const filteredResults = Array.isArray(readBooks)
    ? readBooks?.filter((book) => book.title.includes(searchBar))
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
      {isPending ? (
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
