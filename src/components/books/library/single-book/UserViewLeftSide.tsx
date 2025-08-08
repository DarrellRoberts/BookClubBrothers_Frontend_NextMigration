import { Book } from "@/types/BookInterface"
import React, { useState } from "react"
import BookCover from "../BookCover"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import Profile from "@/components/misc/profile/Profile"
import useSingleUserFetch from "@/hooks/fetch-hooks/useSingleUserFetch"
import NavigateBook from "./NavigateBook"
import Image from "next/image"

type Props = {
  bookData: Book
}

const UserViewLeftSide: React.FC<Props> = ({ bookData }) => {
  const [showLeftNavArrows, setShowLeftNavArrows] = useState<boolean>(true)
  const [showRightNavArrows, setShowRightNavArrows] = useState<boolean>(true)

  const { singleUserData, loadingUser } = useSingleUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users/id/${bookData?.suggestedBy}`
  )
  return (
    <>
      <div className="flex flex-col items-center justify-center max-md:flex-col max-md:items-center">
        <h1 className="font-main text-8xl m-4 pb-20 max-md:text-6xl max-md:mt-8 max-md:text-center max-sm:text-4xl">
          {bookData?.title}
        </h1>
        {!loadingUser ? (
          <div className="flex items-center justify-end h-[100px] mb-[2rem]">
            {showLeftNavArrows && (
              <NavigateBook
                isLeft={true}
                setShowLeftNavArrows={setShowLeftNavArrows}
                setShowRightNavArrows={setShowRightNavArrows}
              />
            )}
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
            </div>
            {showRightNavArrows && (
              <NavigateBook
                setShowRightNavArrows={setShowRightNavArrows}
                setShowLeftNavArrows={setShowLeftNavArrows}
              />
            )}
          </div>
        ) : null}
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
    </>
  )
}

export default UserViewLeftSide
