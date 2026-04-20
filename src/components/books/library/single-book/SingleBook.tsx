"use client"

import { useParams } from "next/navigation"
import Loader from "@/components/loader/Loader"
import RatingCon from "@/components/books/library/single-book/RatingCon"
import CommentCon from "@/components/books/library/single-book/CommentCon"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import { useAppSelector } from "@/store/lib/hooks"
import { useAuth } from "@/hooks/auth-hooks/useAuth"
import UserViewLeftSide from "@/components/books/library/single-book/UserViewLeftSide"
import AdminViewLeftSide from "@/components/books/library/single-book/AdminViewLeftSide"
import AdminViewRightSide from "@/components/books/library/single-book/AdminViewRightSide"
import UserViewRightSide from "@/components/books/library/single-book/UserViewRightSide"
import { useState } from "react"
import NavigateBook from "@/components/books/library/single-book/NavigateBook"
import { API_SINGLE_BOOK } from "@/configs/config"
import SuggestedByIcon from "@/components/books/library/single-book/SuggestedByIcon"
import { Book } from "@/types/BookInterface"
import { useGetQuery } from "@/hooks/fetch-hooks/useGetQuery"

const SingleBook = () => {
  const [showLeftNavArrows, setShowLeftNavArrows] = useState<boolean>(true)
  const [showRightNavArrows, setShowRightNavArrows] = useState<boolean>(true)

  const { id } = useParams<{ id: string }>()
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID
  const { decodedToken } = useAuth()

  const {
    data: bookData,
    isLoading,
    isError,
    error,
  } = useGetQuery<Book>({
    queryKey: ["books", `${id}`],
    apiPath: `${API_SINGLE_BOOK}${id}`,
  })

  const showDelete = useAppSelector((state) => state.editBookButtons.showDelete)
  return showDelete ? (
    <h1 className="font-main text-[5rem] m-4 pb-[5rem] md:text-[3.5rem] md:mt-8 md:text-center sm:text-[2.5rem]">
      Book is deleted
    </h1>
  ) : isError ? (
    <h1>{error.message}</h1>
  ) : isLoading && !bookData ? (
    <Loader />
  ) : (
    <div className="gap-6 flex flex-col items-center">
      <h1 className="text-7xl max-lg:text-5xl m-0 text-center mt-8 max-lg:h-45">
        {bookData?.title}
      </h1>
      <SuggestedByIcon bookData={bookData} />
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
      <div className="flex justify-around w-full max-lg:flex-col max-lg:gap-5">
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
          singleBook={bookData}
          id={id}
          loading={isLoading}
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
