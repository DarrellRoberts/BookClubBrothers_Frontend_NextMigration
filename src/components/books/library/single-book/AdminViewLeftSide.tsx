import DeleteBook from "@/components/forms/bookform-delete/DeleteBook"
import EditTitleButton from "@/components/forms/editbookform-single-book/title/EditTitleButton"
import { Book } from "@/types/BookInterface"
import React from "react"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import EditImageButton from "@/components/forms/editbookform-single-book/image/EditImageButton"
import EditTitle from "@/components/forms/editbookform-single-book/title/EditTitle"
import EditImage from "@/components/forms/editbookform-single-book/image/EditImage"
import { useAppSelector } from "@/store/lib/hooks"
import BookCard from "../BookCard"

type Props = {
  bookData: Book
  bookId: string
}

const AdminViewSingleBook: React.FC<Props> = ({ bookData, bookId }) => {
  const { showTitle, showBookImage } = useAppSelector(
    (state) => state.editBookButtons,
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
        <div>
          <BookCard
            title={bookData?.title}
            totalScore={bookData?.totalScore}
            hideScores={handleHideScores_NoSetter(
              bookData?.actualDateOfMeeting,
            )}
            imageURL={bookData?.imageURL}
            isSingleBook={true}
          />
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
