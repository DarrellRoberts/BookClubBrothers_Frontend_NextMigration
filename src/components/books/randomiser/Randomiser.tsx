"use client"

import RandomSectionLeft from "@/components/books/randomiser/RandomSectionLeft"
import RandomSectionRight from "@/components/books/randomiser/RandomSectionRight"
import RandomiserFilters from "@/components/books/randomiser/RandomiserFilters"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/store/lib/hooks"
import { API_UNREAD_BOOKS, API_USERS } from "@/configs/config"
import { useGetQuery } from "@/hooks/fetch-hooks/useGetQuery"
import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"

const Randomiser = () => {
  const [randomiserBooks, setRandomiserBooks] = useState([])

  const isRefresh = useAppSelector((state) => state.editButtons.isRefresh)

  const {
    data: bookData,
    isLoading,
    isError,
    error,
  } = useGetQuery<Book[]>({
    queryKey: ["unread books"],
    apiPath: API_UNREAD_BOOKS,
  })

  const { data: userData, isLoading: isLoadingUsers } = useGetQuery<User[]>({
    queryKey: ["users"],
    apiPath: API_USERS,
  })

  useEffect(() => {
    setRandomiserBooks(bookData)
  }, [bookData, isLoading, isRefresh])
  return (
    <div>
      <h1 className="font-main text-[clamp(4rem,8vw,8rem)] text-center mt-12 max-md:text-[2.5rem] max-md:mt-12">
        Randomiser
      </h1>
      <div className="flex justify-center">
        <RandomiserFilters
          userData={userData}
          setBookData={setRandomiserBooks}
          bookData={bookData}
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        {randomiserBooks?.length === 0 ? (
          <div className="grid aspect-[2/1.5] w-[clamp(250px,100vw,900px)] grid-cols-[1fr_2fr] grid-rows-1 p-4 border-solid border-2 border-[var(--default-border-color)] max-md:flex max-md:flex-col max-md:justify-evenly max-md:aspect-[1/1.5] max-md:w-[275px]">
            <div className="mt-12 flex w-full justify-center">
              <h2 className="text-3xl">No results found</h2>
            </div>
            <div className="mt-12 flex w-full justify-center">
              <h2 className="text-3xl">Try another filter</h2>
            </div>
          </div>
        ) : (
          <div className="grid aspect-[2/1.5] w-[clamp(250px,100vw,900px)] grid-cols-[1fr_2fr] grid-rows-1 p-4 border-solid border-2 border-[var(--default-border-color)] max-md:flex max-md:flex-col max-md:justify-evenly max-md:aspect-[1/1.5] max-md:w-[275px]">
            <RandomSectionLeft
              bookData={randomiserBooks}
              userData={userData}
              loadingBooks={isLoading}
              loadingUsers={isLoadingUsers}
            />
            <RandomSectionRight
              bookData={randomiserBooks}
              userData={userData}
              error={error}
              isError={isError}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Randomiser
