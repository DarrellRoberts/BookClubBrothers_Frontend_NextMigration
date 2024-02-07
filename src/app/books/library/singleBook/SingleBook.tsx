import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../loader/Loader";
import BookCover from "../booklibrary/BookCover.js";
import { dateFormatter } from "../../../functions/dateFormatter.js";
import Back from "../../misc/Back.js";
import DeleteBook from "../booklibrary/bookform/DeleteBook.js";
import RatingCon from "./RatingCon.js";
import CommentCon from "./CommentCon.js"
import { AuthContext } from "../../../context/authContext.js";
import { useJwt } from "react-jwt";
import "../../../style/singlebook.css";
import "../../../style/singlebookRes.css";

// importing edit buttons
import EditAuthorButton from "./editbookform/author/EditAuthorButton.js";
import EditAuthor from "./editbookform/author/EditAuthor.js";
import EditPublishButton from "./editbookform/published/EditPublishButton.js";
import EditPublished from "./editbookform/published/EditPublished.js";
import EditPagesButton from "./editbookform/pages/EditPagesButton.js";
import EditPages from "./editbookform/pages/EditPages.js";
import EditDateButton from "./editbookform/datemeeting/EditDateButton.js";
import EditDate from "./editbookform/datemeeting/EditDate.js";
import EditGenreButton from "./editbookform/genre/EditGenreButton.js";
import EditGenre from "./editbookform/genre/EditGenre.js";
import EditTitleButton from "./editbookform/title/EditTitleButton.js";
import EditTitle from "./editbookform/title/EditTitle.js";
import EditImageButton from "./editbookform/image/EditImageButton.js";
import EditImage from "./editbookform/image/EditImage.js";

interface book {
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

const SingleBook: React.FC = () => {
  const [bookData, setBook] = useState<book>();
  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [showAuthorEdit, setAuthorEdit] = useState(false);
  const [showPublishEdit, setPublishEdit] = useState(false);
  const [showPageEdit, setPageEdit] = useState(false);
  const [showDateEdit, setDateEdit] = useState(false)
  const [showGenreEdit, setGenreEdit] = useState(false)
  const [showTitleEdit, setTitleEdit] = useState(false)
  const [showImageEdit, setImageEdit] = useState(false)
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);
  const { decodedToken }: { decodedToken?: { username: string, _id: string } } =
    useJwt(token);
  const { id } = useParams();
  const AdId = "65723ac894b239fe25fe6871"

  const getBookData = async () => {
    try {
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/books/${id}`
      );
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

  console.log(bookData);

  return (
    <>
      <Back />
      {showDelete ? (
        <h1 className="bookTitle flex justify-center items-center h-screen text-center">
          Book is deleted
        </h1>
      ) : loading ? (
        <Loader />
      ) : (
        <div className="mainSingleCon flex items-center">
          <div className="bookTitleCon flex flex-col">
            {decodedToken?._id === AdId ? (
              <DeleteBook id={id} setShowDelete={setShowDelete} />
            ) : null}
            {showTitleEdit ? (
              <div className="flex mt-5">
              <EditTitle id={id} inTitle={bookData?.title}/>
              </div>
            ) : (
            <h1 className="bookTitle">{bookData.title}</h1>
            )}
            {decodedToken?._id === AdId ? (
              <EditTitleButton showTitleEdit={showTitleEdit} setTitleEdit={setTitleEdit}/>
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
            {showImageEdit ? (
              <div className="ml-5">
              <EditImage id={id} />
              </div>
            ) : null}
            {decodedToken?._id === AdId ? (
              <EditImageButton showImageEdit={showImageEdit} setImageEdit={setImageEdit}/>
            ) : null}
          </div>

{/* rightside */}
          <div className="bookRightCon flex flex-col m-20">
            <h2 className="text-5xl underline">Details</h2>
            <ul>
              <li className="mt-5 underline">Author</li>
              <li className="">
                {showAuthorEdit ? (
                  <EditAuthor inAuthor={bookData?.author} id={id} />
                ) : (
                  bookData?.author
                )}
              </li>
              {decodedToken?._id === AdId ? (
                <span>
                  <EditAuthorButton
                    setAuthorEdit={setAuthorEdit}
                    showAuthorEdit={showAuthorEdit}
                  />
                </span>
              ) : null}
              
              <li className="mt-5 underline">Published in</li>
              <li className="">
                {showPublishEdit ? (
                  <EditPublished inPublish={bookData?.yearPublished} id={id}/>
                ) :
                bookData?.yearPublished < 0
                  ? Math.abs(bookData?.yearPublished) + " BCE"
                  : bookData?.yearPublished}
              </li>
                  {decodedToken?._id === AdId ? (
                    <EditPublishButton 
                    showPublishEdit={showPublishEdit} 
                    setPublishEdit={setPublishEdit} />
                  ) : null}
              <li className="mt-5 underline">Number of pages</li>
              {showPageEdit ? (
                <EditPages inPages={bookData?.pages} id={id}/>
              ) : (
              <li className="">{bookData?.pages}</li>)}
              {decodedToken?._id === AdId ? (
                <EditPagesButton showPageEdit={showPageEdit} setPageEdit={setPageEdit}/>
              ) : null}

              <li className="mt-5 underline">Genres</li>
              {showGenreEdit ? (
                <EditGenre id={id} inGenre={bookData?.genre.map((type) => type)}/>
              ) :
              bookData?.genre.map((type) => (
                <li>
                  {type[bookData?.genre?.length - 1] ? ` ${type}` : ` ${type},`}
                </li>
              ))}
                {decodedToken?._id === AdId ? (
                <EditGenreButton showGenreEdit={showGenreEdit} setGenreEdit={setGenreEdit} />
              ) : null}

              <li className="mt-5 underline">Read</li>
              <li className="">{bookData?.read ? "Yes" : "No"}</li>

              <li className="mt-5 underline">Date of meeting</li>
              <li className="">
                {showDateEdit ? (
                  <EditDate id={id}/>
                ) :
                bookData?.dateOfMeeting
                  ? dateFormatter(bookData?.dateOfMeeting)
                  : "???"}
              </li>
              {decodedToken?._id === AdId ? (
                <EditDateButton showDateEdit={showDateEdit} setDateEdit={setDateEdit} />
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
