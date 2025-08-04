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

const SingleBook: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const { decodedToken } = useAuth()

  const { bookData, loadingBooks, error } = useBookFetch(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    id
  )

  const showDelete = useAppSelector((state) => state.editBookButtons.showDelete)
  return (
    <>
      {showDelete ? (
        <h1 className="font-main text-[5rem] m-4 pb-[5rem] md:text-[3.5rem] md:mt-8 md:text-center sm:text-[2.5rem]">
          Book is deleted
        </h1>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : loadingBooks && !bookData ? (
        <Loader />
      ) : (
        <div className="max-md:flex-col max-md:items-center flex items-center">
          {decodedToken?._id === adminId ? (
            <AdminViewLeftSide bookData={bookData} bookId={bookData._id} />
          ) : (
            <UserViewLeftSide bookData={bookData} />
          )}

          <div className="font-main border-2 border-[var(--default-border-color)] p-6 max-lg:w-[400px] max-md:w-[300px] max-md:m-0 max-md:mb-8 flex flex-col m-20">
            <h2 className="text-5xl underline">Details</h2>
            {decodedToken?._id === adminId ? (
              <AdminViewRightSide bookData={bookData} bookId={bookData._id} />
            ) : (
              <UserViewRightSide bookData={bookData} />
            )}
          </div>
        </div>
      )}
      <div className="flex mb-8 max-md:flex-col max-md:items-center">
        <RatingCon
          bookData={bookData}
          id={id}
          loading={loadingBooks}
          hideScores={handleHideScores_NoSetter(bookData?.actualDateOfMeeting)}
        />
        <CommentCon
          bookData={bookData}
          id={id}
          hideScores={handleHideScores_NoSetter(bookData?.actualDateOfMeeting)}
        />
      </div>
    </>
  )
}

export default SingleBook
