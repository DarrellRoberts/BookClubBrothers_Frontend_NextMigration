/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useContext, useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "@/style/dashboard.css";
import "@/style/dashboardRes.css";
import LoadingScreen from "./LoadingScreen";
import { AuthContext } from "../../../../../context/authContext";
import { useJwt } from "react-jwt";
import BookImageCover from "@/app/(home)/books/library/BookImageCover";
import BookCover from "@/app/(home)/books/library/BookCover";
import Graph from "@/components/graphs/brothers/Graph";
import style from "./Dashboard.module.css";
import PieChart from "@/components/graphs/brothers/PieChart";
import Profile from "@/components/misc/profile/Profile";
import PictureUploadButton from "../brotherform/PictureUploadButton";
import CommentCon from "@/components/comments/CommentCon";
import Badges from "@/components/misc/badges/Badges";
import { averageScore, findMinScoreBook, findMaxScoreBook, filterUserReadBooks, filterUserUnreadBooks, unreadBookTitles, userReadBookTitles } from "@/functions/stat-functions/scoreFunctions";
import { Book } from "@/types/BookInterface";

type StateType = {
  showImage: boolean;
};

const reducer = (state: StateType, action) => {
  switch (action.type) {
  case "toggleImage":
    return { showImage: !state.showImage };
  default:
    return state;
  }
};

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const [state, dispatch] = useReducer(reducer, {
    showImage: false,
  });

  const { token } = useContext(AuthContext);

  const {
    decodedToken,
  }: {
    decodedToken?: {
      username: string;
      _id: string;
    };
  } = useJwt(token);

  const getData = async () => {
    try {
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/users`
      );
      const user = await data.json();
      setUserData(user);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  const { username } = useParams();
  const id: string = decodedToken?._id;
  const findUser =
    userData.find((user) => user.username === username) ??
    userData.find((user) => user._id === id);

  const getBookData = async () => {
    try {
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/books`
      );
      const book = await data.json();
      const readBooks = book.filter((item) => item.read === true);
      setBookData(readBooks);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  const scoreArray = findUser?.userInfo?.books?.score;

  //statistics vars
  const findMinBook: Book = findMinScoreBook(bookData, scoreArray, findUser);
  const findMaxBook: Book = findMaxScoreBook(bookData, scoreArray, findUser);
  const avgScore: string = averageScore(findUser);

  const userReadBooks: Book[] = filterUserReadBooks(bookData, findUser?._id);
  const userUnreadBooks: Book[] = filterUserUnreadBooks(bookData, findUser?._id);

  const unreadBooksArr: string[] = unreadBookTitles(bookData, findUser?._id);
  const readBooksArr: string[] = userReadBookTitles(bookData, findUser?._id);

  const noUserReadBooks: number = findUser?.userInfo?.books?.score?.length;

  // comments
  const filterComments = bookData.filter((book) =>
    book.commentInfo.commentId.includes(findUser?._id)
  );

  useEffect(() => {
    getData();
    getBookData();
  }, []);
  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <div className={style.headerCon}>
            <h1 className="dashboardTitle">{findUser?.username}</h1>
            <div className={style.achievementCon}>
              <h2>Achievements</h2>
              <Badges
                badgeData={findUser?.userInfo?.badges}
              />
            </div>
            <div className={style.profileCon}>
              <div className="flex-column">
                <Profile imageURL={findUser?.userInfo?.profileURL} />
                {decodedToken?._id === findUser?._id ? (
                  <div className="flex justify-center mt-2">
                    <PictureUploadButton
                      id={findUser?._id}
                      inImage={findUser?.userInfo?.profileURL}
                      showImage={state.showImage}
                      dispatch={dispatch}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className={style.boxLayout}>
            <div className={style.box}>
              <h2 className="underline">Worst book</h2>
              <div className={style.boxItem}>
                <Link href={`/books/library/${findMinBook?._id}`}>
                  {findMinBook?.reviewImageURL ? (
                    <BookImageCover imageURL={findMinBook?.reviewImageURL} />
                  ) : (
                    <BookCover
                      title={findMinBook?.title}
                      totalScore={findMinBook?.totalScore}
                      ratingArr={findMinBook?.scoreRatings?.rating}
                      raterArr={findMinBook?.scoreRatings?.raterId}
                    />
                  )}
                </Link>
              </div>
            </div>

            <div className={style.box}>
              <h2 className="underline">Best book</h2>
              <div className={style.boxItem}>
                <Link href={`/books/library/${findMaxBook?._id}`}>
                  {findMaxBook?.reviewImageURL ? (
                    <BookImageCover imageURL={findMaxBook?.reviewImageURL} />
                  ) : (
                    <BookCover
                      title={findMaxBook?.title}
                      totalScore={findMaxBook?.totalScore}
                      ratingArr={findMaxBook?.scoreRatings?.rating}
                      raterArr={findMaxBook?.scoreRatings?.raterId}
                    />
                  )}
                </Link>
              </div>
            </div>

            <div className={style.box}>
              <h2 className="underline">Books read</h2>
              <div className={style.boxPieItem}>
                <PieChart
                  userReadBooks={readBooksArr}
                  unreadBooks={unreadBooksArr}
                  booksRead={[noUserReadBooks, userUnreadBooks.length]}
                  bookTotal={bookData.length}
                />
              </div>
            </div>

            <div className={style.box}>
              <h2 className="underline">Average Score</h2>
              <Link href="/brothers/stats">
                <div className={style.boxItem}>
                  <h2 className={style.userScore}> {avgScore}</h2>
                </div>
              </Link>
            </div>
          </div>

          <div className="flex">
            <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
              <Link href="/books">
                <h2>The Books</h2>
              </Link>
            </div>

            <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
              <Link href="/brothers">
                <h2>The Brothers</h2>
              </Link>
            </div>
          </div>

          <div className={style.graphCon}>
            <h2 className="underline">Books scored</h2>
            <Graph
              bookTitles={userReadBooks?.map((book) => book.title)}
              totalBookScores={userReadBooks?.map((book) => book.totalScore)}
              bookScores={userReadBooks?.map(
                (book) =>
                  book?.scoreRatings?.rating[
                    book?.scoreRatings?.raterId.indexOf(findUser?._id)
                  ]
              )}
              username={findUser?.username}
            />
          </div>

          <div className={style.commentSection}>
            <h2 className="underline">Comments</h2>
            <CommentCon
              comments={filterComments}
              username={findUser?.username}
              userId={findUser?._id}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
