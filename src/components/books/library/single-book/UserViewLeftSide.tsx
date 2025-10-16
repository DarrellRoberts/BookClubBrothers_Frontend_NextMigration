import { Book } from "@/types/BookInterface"
import React, { useState } from "react"
import BookCover from "../BookCover"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import Profile from "@/components/misc/profile/Profile"
import useSingleUserFetch from "@/hooks/fetch-hooks/useSingleUserFetch"
import NavigateBook from "./NavigateBook"
import Image from "next/image"
import { Skeleton } from "antd"
import BookSkeleton from "../BookSkeleton"
import { useAppSelector } from "@/store/lib/hooks"

type Props = {
  bookData: Book
}

const UserViewLeftSide: React.FC<Props> = ({ bookData }) => {
  const [showLeftNavArrows, setShowLeftNavArrows] = useState<boolean>(true)
  const [showRightNavArrows, setShowRightNavArrows] = useState<boolean>(true)

  const { singleUserData, loadingUser } = useSingleUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users/id/${bookData?.suggestedBy}`
  )
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

  return !loadingUser ? (
    <div className="flex flex-col items-center justify-center max-md:flex-col max-md:items-center">
      {/* <div className="flex items-center justify-end h-[100px] mb-[2rem]"> */}
      <div className="flex flex-col items-center justify-center">
        <h2>Suggested by: </h2>
        <Profile
          imageURL={singleUserData?.userInfo?.profileURL}
          width={75}
          height={100}
          isLink={singleUserData?.username?.length > 0}
          username={singleUserData?.username}
        />
        <h2 className="p-[0] m-[0]">{singleUserData?.username}</h2>
        {/* </div> */}
      </div>
      <div>
        {bookData?.reviewImageURL ? (
          <Image
            src={bookData?.reviewImageURL}
            alt="book_review_image"
            width={600}
            height={400}
            className="w-[600px] h-[400px] border-2 border-solid border-[var(--default-border-color)] m-5 max-md:w-[350px] max-md:h-[275px] max-sm:w-[275px] max-sm:h-[225px]"
          />
        ) : (
          <BookCover
            title={bookData?.title}
            totalScore={bookData?.totalScore}
            ratingArr={bookData?.scoreRatings?.rating}
            raterArr={bookData?.scoreRatings?.raterId}
            hideScores={handleHideScores_NoSetter(
              bookData?.actualDateOfMeeting
            )}
            isSingleBook={true}
          />
        )}
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
      <div className="flex flex-col items-center justify-center gap-2">
        <h2>Suggested by: </h2>
        <Skeleton.Avatar
          active={true}
          style={{
            filter: isDarkMode ? "invert(1)" : "invert(0)",
            width: 75,
            height: 75,
          }}
        />
        <Skeleton.Input
          active={true}
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <div className="">
          <BookSkeleton freq={1} noTitle />
        </div>
      </div>
    </div>
  )
}

export default UserViewLeftSide
