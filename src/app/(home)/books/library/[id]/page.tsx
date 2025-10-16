/* eslint-disable react/react-in-jsx-scope */
"use client"

import { useParams } from "next/navigation"
import Loader from "@/components/loader/Loader"
import RatingCon from "../../../../../components/books/library/single-book/RatingCon"
import CommentCon from "../../../../../components/books/library/single-book/CommentCon"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch"
import { useAppSelector } from "@/store/lib/hooks"
import { useAuth } from "@/hooks/auth-hooks/useAuth"
import UserViewLeftSide from "@/components/books/library/single-book/UserViewLeftSide"
import AdminViewLeftSide from "@/components/books/library/single-book/AdminViewLeftSide"
import AdminViewRightSide from "@/components/books/library/single-book/AdminViewRightSide"
import UserViewRightSide from "@/components/books/library/single-book/UserViewRightSide"
import { useState } from "react"
import NavigateBook from "@/components/books/library/single-book/NavigateBook"

const SingleBook: React.FC = () => {
  const [showLeftNavArrows, setShowLeftNavArrows] = useState<boolean>(true)
  const [showRightNavArrows, setShowRightNavArrows] = useState<boolean>(true)

  const { id } = useParams<{ id: string }>()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const { decodedToken } = useAuth()

  const { bookData, loadingBooks, error } = useBookFetch(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    id
  )

  const showDelete = useAppSelector((state) => state.editBookButtons.showDelete)
  return showDelete ? (
    <h1 className="font-main text-[5rem] m-4 pb-[5rem] md:text-[3.5rem] md:mt-8 md:text-center sm:text-[2.5rem]">
      Book is deleted
    </h1>
  ) : error ? (
    <h1>{error.message}</h1>
  ) : loadingBooks && !bookData ? (
    <Loader />
  ) : (
    <div className="gap-6 flex flex-col items-center">
      <h1 className="text-7xl max-lg:text-5xl m-0 text-center mt-8">
        {bookData?.title}
      </h1>
      <div className="flex w-full justify-around items-center my-8">
        {showLeftNavArrows && (
          <NavigateBook
            isLeft={true}
            setShowLeftNavArrows={setShowLeftNavArrows}
            setShowRightNavArrows={setShowRightNavArrows}
          />
        )}
        {showRightNavArrows && (
          <NavigateBook
            setShowRightNavArrows={setShowRightNavArrows}
            setShowLeftNavArrows={setShowLeftNavArrows}
          />
        )}
      </div>
      <div className="flex justify-around w-full max-lg:flex-col">
        {decodedToken?._id === adminId ? (
          <AdminViewLeftSide bookData={bookData} bookId={bookData._id} />
        ) : (
          <UserViewLeftSide bookData={bookData} />
        )}
        <div className="font-main border-2 border-[var(--default-border-color)] p-6 max-md:mb-8 flex flex-col">
          <h2 className="text-5xl underline">Details</h2>
          {decodedToken?._id === adminId ? (
            <AdminViewRightSide bookData={bookData} bookId={bookData._id} />
          ) : (
            <UserViewRightSide bookData={bookData} />
          )}
        </div>
      </div>
      <div className="flex mb-8 max-md:flex-col max-md:items-center w-full justify-around">
        <RatingCon
          bookData={bookData}
          id={id}
          loading={loadingBooks}
          hideScores={handleHideScores_NoSetter(bookData?.actualDateOfMeeting)}
        />{" "}
        <CommentCon
          bookData={bookData}
          id={id}
          hideScores={handleHideScores_NoSetter(bookData?.actualDateOfMeeting)}
        />
      </div>
    </div>
  )
}

export default SingleBook
