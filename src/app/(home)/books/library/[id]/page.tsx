/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import RatingCon from "../../../../../components/books/library/single-book/RatingCon";
import CommentCon from "../../../../../components/books/library/single-book/CommentCon";
import "@/style/singlebook.css";
import "@/style/singlebookRes.css";
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
import { useAppSelector } from "@/store/lib/hooks";
import { useAuth } from "@/hooks/auth-hooks/useAuth";
import UserViewLeftSide from "@/components/books/library/single-book/UserViewLeftSide";
import AdminViewLeftSide from "@/components/books/library/single-book/AdminViewLeftSide";
import AdminViewRightSide from "@/components/books/library/single-book/AdminViewRightSide";
import UserViewRightSide from "@/components/books/library/single-book/UserViewRightSide";

const SingleBook: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const adminId = process.env.NEXT_PUBLIC_ADMIN_ID;
  const { decodedToken } = useAuth();

  const { bookData, loadingBooks, error } = useBookFetch(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    id
  );

  const showDelete = useAppSelector(
    (state) => state.editBookButtons.showDelete
  );
  return (
    <>
      {showDelete ? (
        <h1 className="bookTitle flex justify-center items-center h-screen text-center">
          Book is deleted
        </h1>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : loadingBooks && !bookData ? (
        <Loader />
      ) : (
        <div className="mainSingleCon flex items-center">
          {decodedToken?._id === adminId ? (
            <AdminViewLeftSide bookData={bookData} bookId={bookData._id} />
          ) : (
            <UserViewLeftSide bookData={bookData} />
          )}

          <div className="bookRightCon flex flex-col m-20">
            <h2 className="text-5xl underline">Details</h2>
            {decodedToken?._id === adminId ? (
              <AdminViewRightSide bookData={bookData} bookId={bookData._id} />
            ) : (
              <UserViewRightSide bookData={bookData} />
            )}
          </div>
        </div>
      )}
      <div className="ratingAndCommentCon">
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
  );
};

export default SingleBook;
