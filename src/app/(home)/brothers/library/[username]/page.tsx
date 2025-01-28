/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect, useReducer, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import "@/style/dashboard.css";
import "@/style/dashboardRes.css";
import LoadingScreen from "./LoadingScreen";
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
import {
  averageScore,
  findMinScoreBook,
  findMaxScoreBook,
  filterUserReadBooks,
  filterUserUnreadBooks,
  unreadBookTitles,
  userReadBookTitles,
} from "@/functions/stat-functions/scoreFunctions";
import { Book } from "@/types/BookInterface";
import { formatServerDate } from "@/functions/time-functions/formatServerDate";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
import Filters from "@/components/graphs/brothers/Filters";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { useAppSelector } from "@/store/lib/hooks";

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
  const { userData, loadingUsers } = useUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users`,
    null
  );

  const { bookData, loadingBooks } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  );

  const readBooks = bookData?.filter((book) => book.read === true);

  const [fetchedData, setFetchedData] = useState<Book[]>();

  const [state, dispatch] = useReducer(reducer, {
    showImage: false,
  });

  const token = useAppSelector((state) => state.token.tokenState);

  const {
    decodedToken,
  }: {
    decodedToken?: {
      username: string;
      _id: string;
    };
  } = useJwt(token);

  const { username } = useParams();
  const id: string = decodedToken?._id;
  const findUser =
    userData?.find((user) => user.username === username) ??
    userData?.find((user) => user._id === id);

  const scoreArray = findUser?.userInfo?.books?.score;

  //statistics vars
  const findMinBook: Book = findMinScoreBook(readBooks, scoreArray, findUser);
  const findMaxBook: Book = findMaxScoreBook(readBooks, scoreArray, findUser);
  const avgScore: string = averageScore(findUser)?.toFixed(2);

  const userReadBooks: Book[] = filterUserReadBooks(
    readBooks,
    findUser?._id
  )?.filter((book) => !handleHideScores_NoSetter(book.actualDateOfMeeting));

  const userUnreadBooks: Book[] = filterUserUnreadBooks(
    readBooks,
    findUser?._id
  );

  const unreadBooksArr: string[] = unreadBookTitles(readBooks, findUser?._id);
  const readBooksArr: string[] = userReadBookTitles(readBooks, findUser?._id);

  const sortBooksLowest = () => {
    setFetchedData(
      userReadBooks?.sort(
        (a, b) =>
          a.scoreRatings.rating[a.scoreRatings.raterId.indexOf(findUser?._id)] -
          b.scoreRatings.rating[b.scoreRatings.raterId.indexOf(findUser?._id)]
      )
    );
  };

  const sortBooksHighest = () => {
    setFetchedData(
      userReadBooks
        ?.sort(
          (a, b) =>
            a.scoreRatings.rating[
              a.scoreRatings.raterId.indexOf(findUser?._id)
            ] -
            b.scoreRatings.rating[b.scoreRatings.raterId.indexOf(findUser?._id)]
        )
        .reverse()
    );
  };

  const sortBooksDefault = () => {
    setFetchedData(
      userReadBooks?.sort(
        (a, b) =>
          new Date(b.dateOfMeeting).getTime() -
          new Date(a.dateOfMeeting).getTime()
      )
    );
  };

  const sortBooksOther = () => {
    setFetchedData(
      userReadBooks?.sort(
        (a, b) =>
          new Date(a.dateOfMeeting).getTime() -
          new Date(b.dateOfMeeting).getTime()
      )
    );
  };

  const noUserReadBooks: number = findUser?.userInfo?.books?.score?.length;

  // comments
  const filterComments = userReadBooks?.filter((book) =>
    book.commentInfo.commentId.includes(findUser?._id)
  );

  useEffect(() => {
    sortBooksDefault();
  }, [loadingBooks, loadingUsers]);

  return (
    <>
      {loadingBooks ? (
        <LoadingScreen />
      ) : (
        <>
          <div className={style.headerCon}>
            <div className="flex flex-col">
              <h1 className="dashboardTitle">{findUser?.username}</h1>
              <span className={style.lastLogin}>
                Last login: {formatServerDate(findUser?.lastLoggedIn) ?? ""}
              </span>
            </div>
            <div className={style.achievementCon}>
              <h2>Achievements</h2>
              <Badges badgeData={findUser?.userInfo?.badges} />
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
                      hideScores={handleHideScores_NoSetter(
                        findMinBook?.actualDateOfMeeting
                      )}
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
                      hideScores={handleHideScores_NoSetter(
                        findMaxBook?.actualDateOfMeeting
                      )}
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
                  booksRead={[noUserReadBooks, userUnreadBooks?.length]}
                  bookTotal={readBooks?.length}
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
            {fetchedData?.length <= 0 ? (
              <LoaderNoText />
            ) : (
              <>
                <Filters
                  sortBooksDefault={sortBooksDefault}
                  sortBooksHighest={sortBooksHighest}
                  sortBooksLowest={sortBooksLowest}
                  sortBooksOther={sortBooksOther}
                  type="all"
                />
                <Graph
                  bookTitles={fetchedData?.map((book) => book.title)}
                  totalBookScores={fetchedData?.map((book) => book.totalScore)}
                  bookScores={fetchedData?.map(
                    (book) =>
                      book?.scoreRatings?.rating[
                        book?.scoreRatings?.raterId.indexOf(findUser?._id)
                      ]
                  )}
                  username={findUser?.username}
                />
              </>
            )}
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
