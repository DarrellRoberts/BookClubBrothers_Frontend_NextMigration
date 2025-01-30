import BookCover from "@/components/books/library/BookCover";
import BookImageCover from "@/components/books/library/BookImageCover";
import PictureUploadButton from "@/components/forms/brotherform/PictureUploadButton";
import PieChart from "@/components/graphs/brothers/PieChart";
import Badges from "@/components/misc/badges/Badges";
import Profile from "@/components/misc/profile/Profile";
import { formatServerDate } from "@/functions/time-functions/formatServerDate";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import { useAppSelector } from "@/store/lib/hooks";
import Link from "next/link";
import React from "react";
import { useJwt } from "react-jwt";
import style from "./Dashboard.module.css";
import { User } from "@/types/UserInterface";
import { Book } from "@/types/BookInterface";
import {
  averageScore,
  filterUserUnreadBooks,
  findMaxScoreBook,
  findMinScoreBook,
  unreadBookTitles,
  userReadBookTitles,
} from "@/functions/stat-functions/scoreFunctions";

type Props = {
  user: User;
  readBooks: Book[];
  scoreArray: number[];
};

const BrotherBanner: React.FC<Props> = ({ user, readBooks, scoreArray }) => {
  const token = useAppSelector((state) => state.token.tokenState);
  const {
    decodedToken,
  }: {
    decodedToken?: {
      token: string;
      username: string;
      exp: number;
      _id: string;
    };
  } = useJwt(token);

  const findMinBook: Book = findMinScoreBook(readBooks, scoreArray, user);
  const findMaxBook: Book = findMaxScoreBook(readBooks, scoreArray, user);
  const avgScore: string = averageScore(user)?.toFixed(2);

  const userUnreadBooks: Book[] = filterUserUnreadBooks(readBooks, user?._id);
  const unreadBooksArr: string[] = unreadBookTitles(readBooks, user?._id);
  const readBooksArr: string[] = userReadBookTitles(readBooks, user?._id);
  const noUserReadBooks: number = user?.userInfo?.books?.score?.length;
  return (
    <>
      <div className={style.headerCon}>
        <div className="flex flex-col">
          <h1 className="dashboardTitle">{user?.username}</h1>
          <span className={style.lastLogin}>
            Last login: {formatServerDate(user?.lastLoggedIn) ?? ""}
          </span>
        </div>
        <div className={style.achievementCon}>
          <h2>Achievements</h2>
          <Badges badgeData={user?.userInfo?.badges} />
        </div>
        <div className={style.profileCon}>
          <div className="flex-column">
            <Profile imageURL={user?.userInfo?.profileURL} />
            {decodedToken?._id === user?._id ? (
              <div className="flex justify-center mt-2">
                <PictureUploadButton
                  id={user?._id}
                  inImage={user?.userInfo?.profileURL}
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
    </>
  );
};

export default BrotherBanner;
