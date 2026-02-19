import { Book } from "@/types/BookInterface"
import React from "react"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import BookCard from "../BookCard"
import BookSkeleton from "../BookSkeleton"

type Props = {
  bookData: Book
}

const UserViewLeftSide = ({ bookData }: Props) => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

  return bookData ? (
    <div className="flex flex-col items-center justify-center max-md:flex-col max-md:items-center">
      <div>
        <BookCard
          title={bookData?.title}
          totalScore={bookData?.totalScore}
          hideScores={handleHideScores_NoSetter(bookData?.actualDateOfMeeting)}
          imageURL={bookData?.imageURL || bookData?.reviewImageURL}
          isSingleBook={true}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-4 w-full mt-4">
      <Skeleton.Input
        active={true}
        size="large"
        style={{
          filter: isDarkMode ? "invert(1)" : "invert(0)",
        }}
      />
      <div className="">
        <BookSkeleton freq={1} noTitle />
      </div>
    </div>
  )
}

export default UserViewLeftSide
