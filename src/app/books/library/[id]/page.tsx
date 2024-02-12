"use client"

import { useState, useEffect, useContext, useReducer } from "react";
import { useParams } from "next/navigation";
import Loader from "../../../../components/loader/Loader";
import BookCover from "../BookCover";
import { dateFormatter } from "../../../../functions/dateFormatter.js";
import DeleteBook from "../bookform/DeleteBook";
import RatingCon from "./RatingCon";
import CommentCon from "./CommentCon"
import { AuthContext } from "../../../../context/authContext";
import { useJwt } from "react-jwt";
import "../../../../style/singlebook.css";
import "../../../../style/singlebookRes.css";

// importing edit buttons
import EditAuthorButton from "./editbookform/author/EditAuthorButton";
import EditAuthor from "./editbookform/author/EditAuthor";
import EditPublishButton from "./editbookform/published/EditPublishButton";
import EditPublished from "./editbookform/published/EditPublished";
import EditPagesButton from "./editbookform/pages/EditPagesButton";
import EditPages from "./editbookform/pages/EditPages";
import EditDateButton from "./editbookform/datemeeting/EditDateButton";
import EditDate from "./editbookform/datemeeting/EditDate";
import EditGenreButton from "./editbookform/genre/EditGenreButton";
import EditGenre from "./editbookform/genre/EditGenre";
import EditTitleButton from "./editbookform/title/EditTitleButton";
import EditTitle from "./editbookform/title/EditTitle";
import EditImageButton from "./editbookform/image/EditImageButton";
import EditImage from "./editbookform/image/EditImage";

//Declare TypeScript types
interface book {
  _id : string
  author: string;
  genre: [string];
  reviewImageURL: string;
  totalScore: number;
  title: string;
  scoreRatings: {
    raterId: [string];
    rating: [number];
  };
  yearPublished: number;
  pages: number;
  read: boolean;
  dateOfMeeting: string;
  commentInfo: {
    commentId: [string];
    comments: [string];
  };
}

type StateType = {
  showDelete: boolean;
  showAuthor: boolean;
  showPublish: boolean;
  showPage: boolean;
  showDate: boolean;
  showGenre: boolean;
  showTitle: boolean;
  showImage: boolean;
}

const reducer = (state: StateType, action) => {
  switch (action.type) {
    case "toggleShowDelete":
      return {showDelete: !state.showDelete}
    case "toggleShowAuthor":
      return {showAuthor: !state.showAuthor}
    case "toggleShowPublish":
      return {showPublish: !state.showPublish}
    case "toggleShowPage":
      return {showPage: !state.showPage}
    case "toggleShowDate":
      return {showDate: !state.showDate}
    case "toggleShowGenre":
      return {showGenre: !state.showGenre}
    case "toggleShowTitle":
      return {showTitle: !state.showTitle}
    case "toggleShowImage":
      return {showImage: !state.showImage}
    default:
      return state
  }
}

const SingleBook: React.FC = () => {
  const [bookData, setBook] = useState<book>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [state, dispatch] = useReducer(reducer, {
    showDelete: false, 
    showAuthor: false, 
    showPublish: false, 
    showPage: false, 
    showDate: false, 
    showGenre: false, 
    showTitle: false, 
    showImage: false
  })

  const { token } = useContext(AuthContext);
  const { decodedToken }: { decodedToken?: { username: string, _id: string } } =
    useJwt(token);
  const { id } = useParams();
  const AdId = "65723ac894b239fe25fe6871"

  const getBookData = async () => {
    try {
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/books/${id}`);
      const book = await data.json();
      setBook(book);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };
  useEffect(() => {
    getBookData();
  }, []);
  return (
    <>
      {/* <Back /> */}
      {state.showDelete ? (
        <h1 className="bookTitle flex justify-center items-center h-screen text-center">
          Book is deleted
        </h1>
      ) : loading && !bookData ? (
        <Loader />
      ) : (
        <div className="mainSingleCon flex items-center">
          <div className="bookTitleCon flex flex-col">
            {decodedToken?._id === AdId ? (
              <DeleteBook id={id} dispatch={dispatch} />
            ) : null}
            {state.showTitle ? (
              <div className="flex mt-5">
              <EditTitle id={id} inTitle={bookData?.title}/>
              </div>
            ) : (
            <h1 className="bookTitle">{bookData.title}</h1>
            )}
            {decodedToken?._id === AdId ? (
              <EditTitleButton showTitle={state.showTitle} dispatch={dispatch}/>
            ) : null}
            <div>
              {bookData?.reviewImageURL ? (
                <img
                  src={bookData?.reviewImageURL}
                  alt="book_review_image"
                  width=""
                  height=""
                  className="bookCover border-black border-4 border-black border-solid m-5"
                />
              ) : (
                <div className="bookTitleCoverCon flex justify-center text-center items-center border-4 m-5 border-black border-solid">
                  <BookCover
                    title={bookData?.title}
                    totalScore={bookData?.totalScore}
                    ratingArr={bookData?.scoreRatings?.rating}
                    raterArr={bookData?.scoreRatings?.raterId}
                  />
                </div>
              )}
            </div>
            {state.showImage ? (
              <div className="ml-5">
              <EditImage id={id} />
              </div>
            ) : null}
            {decodedToken?._id === AdId ? (
              <EditImageButton showImage={state.showImage} dispatch={dispatch}/>
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
              {decodedToken?._id === AdId ? (
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
                  <EditPublished inPublish={bookData?.yearPublished} id={id}/>
                ) :
                bookData?.yearPublished < 0
                  ? Math.abs(bookData?.yearPublished) + " BCE"
                  : bookData?.yearPublished}
              </li>
                  {decodedToken?._id === AdId ? (
                    <EditPublishButton 
                    showPublish={state.showPublish} 
                    dispatch={dispatch} />
                  ) : null}
              <li className="mt-5 underline">Number of pages</li>
              {state.showPage ? (
                <EditPages inPages={bookData?.pages} id={id}/>
              ) : (
              <li className="">{bookData?.pages}</li>)}
              {decodedToken?._id === AdId ? (
                <EditPagesButton showPage={state.showPage} dispatch={dispatch}/>
              ) : null}

              <li className="mt-5 underline">Genres</li>
              {state.showGenre ? (
                <EditGenre id={id} inGenre={bookData?.genre.map((type) => type)}/>
              ) :
              bookData?.genre.map((type) => (
                <li>
                  {type[bookData?.genre?.length - 1] ? ` ${type}` : ` ${type},`}
                </li>
              ))}
                {decodedToken?._id === AdId ? (
                <EditGenreButton showGenre={state.showGenre} dispatch={dispatch} />
              ) : null}

              <li className="mt-5 underline">Read</li>
              <li className="">{bookData?.read ? "Yes" : "No"}</li>

              <li className="mt-5 underline">Date of meeting</li>
              <li className="">
                {state.showDate ? (
                  <EditDate id={id}/>
                ) :
                bookData?.dateOfMeeting
                  ? dateFormatter(bookData?.dateOfMeeting)
                  : "???"}
              </li>
              {decodedToken?._id === AdId ? (
                <EditDateButton showDate={state.showDate} dispatch={dispatch} />
              ) : null}

              <li className="mt-5 underline">Score</li>
              <li className="">{bookData?.totalScore}</li>
            </ul>
          </div>
        </div>
      )}
      <div className="ratingAndCommentCon">
      <RatingCon bookData={bookData} id={id} />
      <CommentCon bookData={bookData} id={id} />
      </div>
    </>
  );
};

export default SingleBook;
