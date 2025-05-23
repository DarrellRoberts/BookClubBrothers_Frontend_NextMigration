import { Book } from "@/types/BookInterface"
import React from "react"
import BookCover from "../BookCover"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import "@/style/singlebook.css"
import "@/style/singlebookRes.css"
import Profile from "@/components/misc/profile/Profile"
import useSingleUserFetch from "@/hooks/fetch-hooks/useSingleUserFetch"

type Props = {
  bookData: Book
}

const UserViewSingleBook: React.FC<Props> = ({ bookData }) => {
  const { singleUserData, loadingUser, error } = useSingleUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users/id/${bookData?.suggestedBy}`
  )
  return (
    <>
      <div className="bookTitleCon flex flex-col">
        <h1 className="bookTitle">{bookData?.title}</h1>
        {!loadingUser ? (
          <div className="flex items-center justify-end h-[100px] mb-[2rem]">
            <h2 className="p-[0] font-(family-name:--main)">Suggested by: </h2>
            <Profile
              imageURL={singleUserData?.userInfo?.profileURL}
              scaleMultiplier={0.35}
              isLink={singleUserData?.username?.length > 0}
              username={singleUserData?.username}
            />
          </div>
        ) : null}
        <div>
          {bookData?.reviewImageURL ? (
            <img
              src={bookData?.reviewImageURL}
              alt="book_review_image"
              width=""
              height=""
              className="bookCover border-4 border-solid m-5"
            />
          ) : (
            <div className="bookTitleCoverCon flex justify-center text-center items-center border-4 m-5 border-solid">
              <BookCover
                title={bookData?.title}
                totalScore={bookData?.totalScore}
                ratingArr={bookData?.scoreRatings?.rating}
                raterArr={bookData?.scoreRatings?.raterId}
                hideScores={handleHideScores_NoSetter(
                  bookData?.actualDateOfMeeting
                )}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default UserViewSingleBook
