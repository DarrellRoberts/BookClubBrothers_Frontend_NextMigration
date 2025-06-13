import React, { useEffect, useState } from "react"
import NavigateArrow from "@/assets/right-nav-arrow.svg"
import Link from "next/link"
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch"
import { useAppSelector } from "@/store/lib/hooks"

type Props = {
  isLeft?: boolean
  setShowLeftNavArrows: React.Dispatch<React.SetStateAction<boolean>>
  setShowRightNavArrows: React.Dispatch<React.SetStateAction<boolean>>
}

const NavigateBook = ({
  isLeft,
  setShowLeftNavArrows,
  setShowRightNavArrows,
}: Props) => {
  const [index, setIndex] = useState<number>(0)

  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

  const { bookData, loadingBooks } = useBookFetch(
    `https://bookclubbrothers-backend.onrender.com/books`,
    null
  )

  const filteredBooks = bookData?.filter((book) => book.read)

  useEffect(() => {
    let params: string | string[] = window.location.pathname
    params = params.split("/")
    params = params[params.length - 1]
    if (params) {
      const newIndex = filteredBooks?.indexOf(
        filteredBooks?.find((book) => book._id === params)
      )
      if (newIndex === 0) {
        setShowLeftNavArrows(false)
      } else if (newIndex === filteredBooks?.length - 1) {
        setShowRightNavArrows(false)
      }
      setIndex(newIndex)
    }
  }, [loadingBooks])
  return (
    <>
      {!loadingBooks && (
        <div
          className={`absolute ${
            isLeft ? "left-[0%] ml-[1rem]" : "right-[0%] mr-[1rem]"
          }`}
        >
          <Link
            href={`/books/library/${
              isLeft
                ? filteredBooks[index - 1]?._id
                : filteredBooks[index + 1]?._id
            }`}
          >
            <img
              src={NavigateArrow.src}
              width="30"
              height="30"
              style={{
                filter: isDarkMode ? "invert(1)" : "invert(0)",
                transform: isLeft && "scaleX(-1)",
              }}
            />
          </Link>
        </div>
      )}
    </>
  )
}

export default NavigateBook
