import { Book } from "@/types/BookInterface";
import React from "react";
import BookCover from "../BookCover";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import "@/style/singlebook.css";
import "@/style/singlebookRes.css";

type Props = {
  bookData: Book;
};

const UserViewSingleBook: React.FC<Props> = ({ bookData }) => {
  return (
    <>
      <div className="bookTitleCon flex flex-col">
        <h1 className="bookTitle">{bookData?.title}</h1>
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
  );
};

export default UserViewSingleBook;
