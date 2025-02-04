import DeleteBook from "@/components/forms/bookform-delete/DeleteBook";
import EditTitleButton from "@/components/forms/editbookform-single-book/title/EditTitleButton";
import { Book } from "@/types/BookInterface";
import React from "react";
import BookCover from "../BookCover";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import EditImageButton from "@/components/forms/editbookform-single-book/image/EditImageButton";
import EditTitle from "@/components/forms/editbookform-single-book/title/EditTitle";
import EditImage from "@/components/forms/editbookform-single-book/image/EditImage";
import "@/style/singlebook.css";
import "@/style/singlebookRes.css";
import { useAppSelector } from "@/store/lib/hooks";

type Props = {
  bookData: Book;
  bookId: string;
};

const AdminViewSingleBook: React.FC<Props> = ({ bookData, bookId }) => {
  const { showTitle, showBookImage } = useAppSelector(
    (state) => state.editBookButtons
  );
  return (
    <>
      <div className="bookTitleCon flex flex-col">
        <DeleteBook id={bookId} />
        {showTitle ? (
          <div className="flex mt-5">
            <EditTitle id={bookId} inTitle={bookData?.title} />
          </div>
        ) : (
          <h1 className="bookTitle">{bookData?.title}</h1>
        )}
        <EditTitleButton />
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
        {showBookImage ? (
          <div className="ml-5">
            <EditImage id={bookId} />
          </div>
        ) : null}
        <EditImageButton />
      </div>
    </>
  );
};

export default AdminViewSingleBook;
