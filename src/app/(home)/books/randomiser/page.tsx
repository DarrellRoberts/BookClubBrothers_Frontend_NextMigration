/* eslint-disable react/react-in-jsx-scope */
"use client"

import useBookFetch from "@/hooks/fetch-hooks/useUnreadBookFetch"
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch"
import RandomSectionLeft from "@/components/books/randomiser/RandomSectionLeft"
import RandomSectionRight from "@/components/books/randomiser/RandomSectionRight"
import RandomiserFilters from "@/components/books/randomiser/RandomiserFilters"
import { useEffect, useState } from "react"
import { useAppSelector } from "@/store/lib/hooks"
import { UiModal } from "@/components/ui/modal/UiModal"

const RandomiserHomepage: React.FC = () => {
  const [randomiserBooks, setRandomiserBooks] = useState([])

  const isRefresh = useAppSelector((state) => state.editButtons.isRefresh)

  const { bookData, loadingBooks, error } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books/unread/all",
    null
  )
  const { userData, loadingUsers } = useUserFetch(
    "https://bookclubbrothers-backend.onrender.com/users",
    null
  )

  useEffect(() => {
    setRandomiserBooks(bookData)
  }, [loadingBooks, isRefresh])

  return (
    <div>
      <h1 className="font-main text-[clamp(4rem,8vw,8rem)] ml-8 text-center mt-12 max-md:text-[2.5rem] max-md:mt-12">
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
              loadingBooks={loadingBooks}
              loadingUsers={loadingUsers}
            />
            <RandomSectionRight
              bookData={randomiserBooks}
              userData={userData}
              error={error}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default RandomiserHomepage
