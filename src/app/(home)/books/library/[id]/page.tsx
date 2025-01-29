/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useReducer } from "react";
import { useParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import BookCover from "../../../../../components/books/library/BookCover";
import { dateFormatter } from "@/functions/time-functions/dateFormatter";
import DeleteBook from "../../../../../components/forms/bookform-delete/DeleteBook";
import RatingCon from "../../../../../components/books/library/single-book/RatingCon";
import CommentCon from "../../../../../components/books/library/single-book/CommentCon";
import { useJwt } from "react-jwt";
import "@/style/singlebook.css";
import "@/style/singlebookRes.css";

// importing edit buttons
import EditAuthorButton from "../../../../../components/forms/editbookform-single-book/author/EditAuthorButton";
import EditAuthor from "../../../../../components/forms/editbookform-single-book/author/EditAuthor";
import EditPublishButton from "../../../../../components/forms/editbookform-single-book/published/EditPublishButton";
import EditPublished from "../../../../../components/forms/editbookform-single-book/published/EditPublished";
import EditPagesButton from "../../../../../components/forms/editbookform-single-book/pages/EditPagesButton";
import EditPages from "../../../../../components/forms/editbookform-single-book/pages/EditPages";
import EditDateButton from "../../../../../components/forms/editbookform-single-book/datemeeting/EditDateButton";
import EditDate from "../../../../../components/forms/editbookform-single-book/datemeeting/EditDate";
import EditGenreButton from "../../../../../components/forms/editbookform-single-book/genre/EditGenreButton";
import EditGenre from "../../../../../components/forms/editbookform-single-book/genre/EditGenre";
import EditTitleButton from "../../../../../components/forms/editbookform-single-book/title/EditTitleButton";
import EditTitle from "../../../../../components/forms/editbookform-single-book/title/EditTitle";
import EditImageButton from "../../../../../components/forms/editbookform-single-book/image/EditImageButton";
import EditImage from "../../../../../components/forms/editbookform-single-book/image/EditImage";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
import EditActualDate from "../../../../../components/forms/editbookform-single-book/datemeeting/EditActualDate";
import EditActualDateButton from "../../../../../components/forms/editbookform-single-book/datemeeting/EditActualDateButton";
import { useAppSelector } from "@/store/lib/hooks";

type StateType = {
  showDelete: boolean;
  showAuthor: boolean;
  showPublish: boolean;
  showPage: boolean;
  showDate: boolean;
  showGenre: boolean;
  showTitle: boolean;
  showImage: boolean;
};

const reducer = (state: StateType, action) => {
  switch (action.type) {
    case "toggleShowDelete":
      return { showDelete: !state.showDelete };
    case "toggleShowAuthor":
      return { showAuthor: !state.showAuthor };
    case "toggleShowPublish":
      return { showPublish: !state.showPublish };
    case "toggleShowPage":
      return { showPage: !state.showPage };
    case "toggleShowDate":
      return { showDate: !state.showDate };
    case "toggleShowGenre":
      return { showGenre: !state.showGenre };
    case "toggleShowTitle":
      return { showTitle: !state.showTitle };
    case "toggleShowImage":
      return { showImage: !state.showImage };
    default:
      return state;
  }
};

const SingleBook: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    showDelete: false,
    showAuthor: false,
    showPublish: false,
    showPage: false,
    showDate: false,
    showGenre: false,
    showTitle: false,
    showImage: false,
  });

  const token = useAppSelector((state) => state.token.tokenState);
  const { decodedToken }: { decodedToken?: { username: string; _id: string } } =
    useJwt(token);
  const { id } = useParams<{ id: string }>();
  const adminId = "65723ac894b239fe25fe6871";

  const { bookData, loadingBooks, error } = useBookFetch(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    id
  );

  return (
    <>
      {state.showDelete ? (
        <h1 className="bookTitle flex justify-center items-center h-screen text-center">
          Book is deleted
        </h1>
      ) : error ? (
        <h1>{error.message}</h1>
      ) : loadingBooks && !bookData ? (
        <Loader />
      ) : (
        <div className="mainSingleCon flex items-center">
          <div className="bookTitleCon flex flex-col">
            {decodedToken?._id === adminId ? <DeleteBook id={id} /> : null}
            {state.showTitle ? (
              <div className="flex mt-5">
                <EditTitle id={id} inTitle={bookData?.title} />
              </div>
            ) : (
              <h1 className="bookTitle">{bookData?.title}</h1>
            )}
            {decodedToken?._id === adminId ? (
              <EditTitleButton
                showTitle={state.showTitle}
                dispatch={dispatch}
              />
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
            {state.showImage ? (
              <div className="ml-5">
                <EditImage id={id} />
              </div>
            ) : null}
            {decodedToken?._id === adminId ? (
              <EditImageButton
                showImage={state.showImage}
                dispatch={dispatch}
              />
            ) : null}
          </div>

          {/* rightside */}
          <div className="bookRightCon flex flex-col m-20">
            <h2 className="text-5xl underline">Details</h2>
            <ul>
              <li className="mt-5 underline">Author</li>
              <li className="">
                {state.showAuthor ? (
                  <EditAuthor inAuthor={bookData?.author} id={id} />
                ) : (
                  bookData?.author
                )}
              </li>
              {decodedToken?._id === adminId ? (
                <span>
                  <EditAuthorButton
                    dispatch={dispatch}
                    showAuthor={state.showAuthor}
                  />
                </span>
              ) : null}

              <li className="mt-5 underline">Published in</li>
              <li className="">
                {state.showPublish ? (
                  <EditPublished inPublish={bookData?.yearPublished} id={id} />
                ) : bookData?.yearPublished < 0 ? (
                  Math.abs(bookData?.yearPublished) + " BCE"
                ) : (
                  bookData?.yearPublished
                )}
              </li>
              {decodedToken?._id === adminId ? (
                <EditPublishButton
                  showPublish={state.showPublish}
                  dispatch={dispatch}
                />
              ) : null}
              <li className="mt-5 underline">Number of pages</li>
              {state.showPage ? (
                <EditPages inPages={bookData?.pages} id={id} />
              ) : (
                <li className="">{bookData?.pages}</li>
              )}
              {decodedToken?._id === adminId ? (
                <EditPagesButton
                  showPage={state.showPage}
                  dispatch={dispatch}
                />
              ) : null}

              <li className="mt-5 underline">Genres</li>
              {state.showGenre ? (
                <EditGenre
                  id={id}
                  inGenre={bookData?.genre?.map((type) => type)}
                />
              ) : (
                bookData?.genre?.map((type, i) => (
                  <li key={i}>
                    {type[bookData?.genre?.length - 1]
                      ? ` ${type}`
                      : ` ${type},`}
                  </li>
                ))
              )}
              {decodedToken?._id === adminId ? (
                <EditGenreButton
                  showGenre={state.showGenre}
                  dispatch={dispatch}
                />
              ) : null}

              <li className="mt-5 underline">Planned Meeting Date</li>
              <li className="">
                {state.showDate ? (
                  <EditDate id={id} />
                ) : bookData?.dateOfMeeting ? (
                  dateFormatter(bookData?.dateOfMeeting)
                ) : (
                  "???"
                )}
              </li>
              {decodedToken?._id === adminId ? (
                <EditDateButton showDate={state.showDate} dispatch={dispatch} />
              ) : null}

              <li className="mt-5 underline">Actual Meeting Date</li>
              <li className="">
                {state.showDate ? (
                  <EditActualDate id={id} />
                ) : bookData?.actualDateOfMeeting ? (
                  dateFormatter(bookData?.actualDateOfMeeting)
                ) : (
                  "???"
                )}
              </li>
              {decodedToken?._id === adminId ? (
                <EditActualDateButton
                  showDate={state.showDate}
                  dispatch={dispatch}
                />
              ) : null}

              <li className="mt-5 underline">Score</li>
              <li className="">
                {handleHideScores_NoSetter(bookData?.actualDateOfMeeting)
                  ? "?"
                  : bookData?.totalScore}
              </li>
            </ul>
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
