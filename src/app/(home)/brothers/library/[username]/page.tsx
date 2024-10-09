/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "../../../../../style/dashboard.css";
import "../../../../../style/dashboardRes.css";
import LoadingScreen from "./LoadingScreen";
import { AuthContext } from "../../../../../context/authContext";
import { useJwt } from "react-jwt";
import BookImageCover from "@/app/(home)/books/library/BookImageCover";
import BookCover from "@/app/(home)/books/library/BookCover";
import Graph from "@/components/graphs/brothers/Graph";
import style from "./Dashboard.module.css";
import PieChart from "@/components/graphs/brothers/PieChart";

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // find min score
  // use index in books scored
  // fetch book data

  const scoreArray = findUser?.userInfo?.books?.score;

  //minScore
  const minScore1 =
    Array.isArray(scoreArray) && scoreArray.length > 0
      ? Math.min(...scoreArray)
      : undefined;
  const minScoreIndex = scoreArray?.indexOf(minScore1)
    ? scoreArray.indexOf(minScore1)
    : 0;
  const minScoreBook = findUser?.userInfo?.books?.booksScored[minScoreIndex];

  //maxScore
  const maxScore1 =
    Array.isArray(scoreArray) && scoreArray.length > 0
      ? Math.max(...scoreArray)
      : undefined;
  const maxScoreIndex = scoreArray?.indexOf(maxScore1)
    ? scoreArray.indexOf(maxScore1)
    : 0;
  const maxScoreBook = findUser?.userInfo?.books?.booksScored[maxScoreIndex];

  const getBookData = async () => {
    try {
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/books`
      );
      const book = await data.json();
      setBookData(book);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  const findMinBook = bookData.find((book) => book._id === minScoreBook);
  const findMaxBook = bookData.find((book) => book._id === maxScoreBook);
  const readBooks = bookData.filter((book) => book.read === true);
  const noUserReadBooks: number = findUser?.userInfo?.books?.score?.length;
  const filterReadBooks = readBooks.filter(
    (book) => book.scoreRatings.raterId.includes(findUser?._id)
  );

  //unread books
  const filterUnreadBooks = readBooks.filter(
    (book) => !book.scoreRatings.raterId.includes(findUser?._id)
  );
  const unreadBooks: string[] = filterUnreadBooks.map(book => book.title);
  const userReadBooks: string[] = filterReadBooks.map(book => book.title);

  //Additional Stats
  const averageScore =
    (
      findUser?.userInfo?.books?.score?.reduce((a, c) => a + c, 0) /
      findUser?.userInfo?.books?.score?.length
    ).toFixed(2);

  // all scores
  const filterBooks = bookData.filter((book) =>
    book.scoreRatings.raterId.includes(findUser?._id)
  );

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
          <h1 className="dashboardTitle">{findUser?.username}</h1>
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
                  userReadBooks={userReadBooks}
                  booksRead={[noUserReadBooks, filterUnreadBooks.length]}
                  unreadBooks={unreadBooks}
                  bookTotal={readBooks.length}
                />
              </div>
            </div>

            <div className={style.box}>
              <h2 className="underline">Average Score</h2>
              <Link href="/brothers/stats">
                <div className={style.boxItem}>
                  <h2 className={style.userScore}> {averageScore}</h2>
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
              bookTitles={filterBooks?.map((book) => book.title)}
              totalBookScores={filterBooks?.map((book) => book.totalScore)}
              bookScores={filterBooks?.map(
                (book) =>
                  book?.scoreRatings?.rating[
                    book?.scoreRatings?.raterId.indexOf(findUser?._id)
                  ]
              )}
              username={findUser?.username}
            />
          </div>

          <div className="mt-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <h2 className="underline">Comments</h2>
            <ul>
              {filterComments.length === 0 ? (
                <li> {findUser?.username} has written no comments</li>
              ) : (
                filterComments.map((book, i) => (
                  <li key={i}>
                    {book.title}: "
                    {
                      book.commentInfo.comments[
                        book?.commentInfo?.commentId?.indexOf(findUser?._id)
                      ]
                    }
                    "
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
