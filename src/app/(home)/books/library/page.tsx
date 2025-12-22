/* eslint-disable react/react-in-jsx-scope */
"use client"

import { useState, useEffect } from "react"
import Loader from "@/components/loader/Loader"
import BookCover from "@/components/books/library/BookCover"
import Link from "next/link"
import Search from "@/components/misc/search/Search"
import { Button, ConfigProvider } from "antd"
import BookImageCover from "@/components/books/library/BookImageCover"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch"
import { Book } from "@/types/BookInterface"
import useScrollRef from "@/hooks/scroll-hooks/useScrollRef"
import useLimit from "@/hooks/scroll-hooks/useLimit"
import BookSkeleton from "@/components/books/library/BookSkeleton"
import { UiButton } from "@/components/ui/button/UiButton"

const Booklibrary: React.FC = () => {
  const [searchBar, setSearchBar] = useState<string>("")
  const [books, setBooks] = useState<Book[]>([])

  const { limit, handleLimit, setIsLimit, isLimit } = useLimit()

  const { bookData, loadingBooks, error } = useBookFetch(
    `https://bookclubbrothers-backend.onrender.com/books`,
    limit
  )

  const readBooks = bookData?.filter((book) => book.read === true)

  const lastItemRef = useScrollRef(loadingBooks, limit, handleLimit)

  const filteredResults = Array.isArray(readBooks)
    ? readBooks?.filter((book) =>
        book.title.toLowerCase().includes(searchBar.toLowerCase())
      )
    : ["No results"]

  useEffect(() => {
    if (!loadingBooks) setBooks(filteredResults)
  }, [searchBar])

  useEffect(() => {
    if (books.length === 0 && !loadingBooks) setBooks(filteredResults)
    setBooks((prevItems) => [
      ...prevItems,
      ...filteredResults.slice(prevItems.length + 1, limit),
    ])
    const timer = setTimeout(() => setIsLimit(false), 500)
    return () => clearTimeout(timer)
  }, [limit, loadingBooks])

  return (
    <>
      <div className="flex justify-between m-6 max-xs:flex-col-reverse max-xs:items-center ">
        <Search
          setSearchBar={setSearchBar}
          filteredBooks={filteredResults}
          isDisabled={books.length === 0}
        />
        <UiButton isLink href="/books/library/3d" textContent="3D View" />
      </div>
      <h1 className="text-8xl m-5 max-lg:text-6xl max-lg:text-center">
        Book Library
      </h1>
      {loadingBooks && books.length === 0 ? (
        <BookSkeleton freq={8} />
      ) : error ? (
        <h2> {error?.message}</h2>
      ) : (
        <div className="flex flex-wrap gap-6 mx-4 max-lg:flex-col max-lg:items-center">
          {books?.length > 0 ? (
            books?.map((book) => (
              <div key={book._id}>
                {book.reviewImageURL ? (
                  <Link href={`/books/library/${book._id}`}>
                    <div className="flex justify-center">
                      <h2 className="text-3xl sm:text-1.75xl font-bold text-center underline overflow-hidden whitespace-nowrap text-ellipsis max-w-[275px] mb-2">
                        {book.title}
                      </h2>
                    </div>
                    <BookImageCover
                      title={book?.title}
                      imageURL={book?.reviewImageURL}
                    />
                  </Link>
                ) : (
                  <Link href={`/books/library/${book._id}`}>
                    <div className="flex justify-center w-full">
                      <div className="flex justify-center">
                        <h2 className="text-3xl sm:text-1.75xl font-bold text-center underline overflow-hidden whitespace-nowrap text-ellipsis max-w-[275px] mb-2">
                          {book.title}
                        </h2>
                      </div>
                    </div>
                    <BookCover
                      title={book?.title}
                      totalScore={book?.totalScore}
                      ratingArr={book?.scoreRatings?.rating}
                      raterArr={book?.scoreRatings?.raterId}
                      hideScores={handleHideScores_NoSetter(
                        book?.actualDateOfMeeting
                      )}
                    />
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
      {isLimit && books.length !== 0 ? (
        <Loader screensize="h-100" />
      ) : books.length !== 0 ? (
        <div ref={filteredResults.length === limit ? lastItemRef : null}></div>
      ) : null}
    </>
  )
}

export default Booklibrary
