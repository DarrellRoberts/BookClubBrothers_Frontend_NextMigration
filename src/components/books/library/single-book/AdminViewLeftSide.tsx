import DeleteBook from "@/components/forms/bookform-delete/DeleteBook"
import EditTitleButton from "@/components/forms/editbookform-single-book/title/EditTitleButton"
import { Book } from "@/types/BookInterface"
import React, { useState } from "react"
import BookCover from "../BookCover"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import EditImageButton from "@/components/forms/editbookform-single-book/image/EditImageButton"
import EditTitle from "@/components/forms/editbookform-single-book/title/EditTitle"
import EditImage from "@/components/forms/editbookform-single-book/image/EditImage"
import { useAppSelector } from "@/store/lib/hooks"
import NavigateBook from "./NavigateBook"
import Profile from "@/components/misc/profile/Profile"
import useSingleUserFetch from "@/hooks/fetch-hooks/useSingleUserFetch"
import Image from "next/image"
import { config } from "@/configs/config"

type Props = {
  bookData: Book
  bookId: string
}

const AdminViewSingleBook: React.FC<Props> = ({ bookData, bookId }) => {
  const { showTitle, showBookImage } = useAppSelector(
    (state) => state.editBookButtons
  )
  const { singleUserData } = useSingleUserFetch(
    `${config.API_URL}/users/id/${bookData?.suggestedBy}`,
    bookData?.suggestedBy
  )
  return (
    <>
      <div className="flex flex-col items-center justify-center max-md:flex-col max-md:items-center">
        <DeleteBook id={bookId} />
        {showTitle && (
          <div className="flex mt-5">
            <EditTitle id={bookId} inTitle={bookData?.title} />
          </div>
        )}
        <EditTitleButton />
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
        {showBookImage ? (
          <div className="ml-5">
            <EditImage id={bookId} />
          </div>
        ) : null}
        <EditImageButton />
      </div>
    </>
  )
}

export default AdminViewSingleBook
