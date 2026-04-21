import { Book } from "@/types/BookInterface"
import React from "react"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import BookCard from "../BookCard"
import BookSkeleton from "../BookSkeleton"
import { BookLeftSideSkeleton } from "./skeletons/BookLeftSideSkeleton"

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
          imageURL={
            bookData?.reviewImageURL ||
            bookData?.imageURL ||
            "/Profile.unknown-profile-image.jpg"
          }
          isSingleBook={true}
        />
      </div>
    </div>
  ) : (
    <BookLeftSideSkeleton />
  )
}

export default UserViewLeftSide
