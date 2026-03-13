"use client"

import { useState, useEffect } from "react"
import Loader from "@/components/loader/Loader"
import Link from "next/link"
import Search from "@/components/misc/search/Search"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import { Book } from "@/types/BookInterface"
import useScrollRef from "@/hooks/scroll-hooks/useScrollRef"
import useLimit from "@/hooks/scroll-hooks/useLimit"
import BookSkeleton from "@/components/books/library/BookSkeleton"
import { API_BOOKS, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import BookCard from "@/components/books/library/BookCard"
import { useGetQuery } from "@/hooks/fetch-hooks/useGetQuery"
import { TIME_MILLISECONDS } from "@/hooks/timeVars"

const BookLibrary: React.FC = () => {
  const [searchBar, setSearchBar] = useState<string>("")
  const [books, setBooks] = useState<Book[] | string[]>([])

  const { limit, handleLimit, setIsLimit, isLimit } = useLimit()

  const {
    data: bookData,
    isLoading,
    isError,
    error,
  } = useGetQuery<Book[]>({
    queryKey: ["books"],
    apiPath: API_BOOKS,
    staleTime: TIME_MILLISECONDS.ONE_MONTH,
  })

  const readBooks = bookData?.length
    ? bookData.filter((book) => book.read === true)
    : []

  const lastItemRef = useScrollRef(isLoading, limit, handleLimit)

  const filteredResults = Array.isArray(readBooks)
    ? readBooks?.filter((book) =>
        book.title.toLowerCase().includes(searchBar.toLowerCase()),
      )
    : ["No results"]

  useEffect(() => {
    if (!isLoading) setBooks(filteredResults)
  }, [searchBar])

  useEffect(() => {
    if (books.length === 0 && !isLoading) setBooks(filteredResults)
    setBooks(
      (prevItems) =>
        [
          ...prevItems,
          ...filteredResults.slice(prevItems.length + 1, limit),
        ] as Book[],
    )
    const timer = setTimeout(() => setIsLimit(false), 500)
    return () => clearTimeout(timer)
  }, [limit, isLoading])

  return (
    <>
      <div className="flex justify-between m-6 max-xs:flex-col-reverse max-xs:items-center ">
        <Search
          setSearchBar={setSearchBar}
          filteredBooks={filteredResults}
          isDisabled={isLoading}
        />
        <UiButton isLink href="/books/library/3d" textContent="3D View" />
      </div>
      <h1 className="text-8xl m-5 max-lg:text-6xl max-lg:text-center max-lg:mb-20">
        Book Library
      </h1>
      {isLoading && books.length === 0 ? (
        <BookSkeleton freq={8} />
      ) : isError ? (
        <h2> {error?.message}</h2>
      ) : (
        <div className="flex flex-wrap gap-10 mx-4 max-sm:justify-center">
          {books?.length > 0 ? (
            books?.map((book) => (
              <div key={book._id}>
                <Link href={`/books/library/${book._id}`}>
                  <div className="flex justify-center w-full">
                    <div className="flex justify-center">
                      <h2 className="text-3xl sm:text-1.75xl font-bold text-center underline overflow-hidden whitespace-nowrap text-ellipsis max-w-[250px] mb-2">
                        {book.title}
                      </h2>
                    </div>
                  </div>
                  <BookCard
                    key={book._id}
                    title={book.title}
                    imageURL={
                      book.reviewImageURL
                        ? book.reviewImageURL
                        : book?.imageURL
                          ? book?.imageURL
                          : "/Profile.unknown-profile-image.jpg"
                    }
                    totalScore={book?.totalScore}
                    hideScores={handleHideScores_NoSetter(
                      book?.actualDateOfMeeting,
                    )}
                  />
                </Link>
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

export default BookLibrary
