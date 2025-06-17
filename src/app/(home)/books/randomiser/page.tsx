/* eslint-disable react/react-in-jsx-scope */
"use client"

import style from "@/components/books/randomiser/randomiser.module.css"
import useBookFetch from "@/hooks/fetch-hooks/useUnreadBookFetch"
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch"
import RandomSectionLeft from "@/components/books/randomiser/RandomSectionLeft"
import RandomSectionRight from "@/components/books/randomiser/RandomSectionRight"
import RandomiserFilters from "@/components/books/randomiser/RandomiserFilters"
import { useEffect, useState } from "react"

const RandomiserHomepage: React.FC = () => {
  const [randomiserBooks, setRandomiserBooks] = useState([])

  const { bookData, loadingBooks, error } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books/unread/all",
    null
  )
  const { userData, loadingUsers } = useUserFetch(
    "https://bookclubbrothers-backend.onrender.com/users",
    null
  )

  useEffect(() => {
    if (bookData?.length > 0) setRandomiserBooks(bookData)
  }, [loadingBooks])

  return (
    <div>
      <h1 className={style.randomTitle}>Randomiser</h1>
      <div className="flex justify-center">
        <RandomiserFilters
          userData={userData}
          setBookData={setRandomiserBooks}
          bookData={bookData}
        />
      </div>
      <div className={style.randomCon}>
        {randomiserBooks?.length === 0 ? (
          <div className={style.randomBox}>
            <div className="flex w-full justify-center mt-[3rem]">
              <h2 className="text-3xl">No results found</h2>
            </div>
            <div className="flex w-full justify-center mt-[3rem]">
              <h2 className="text-3xl">Try another filter</h2>
            </div>
          </div>
        ) : (
          <div className={style.randomBox}>
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
