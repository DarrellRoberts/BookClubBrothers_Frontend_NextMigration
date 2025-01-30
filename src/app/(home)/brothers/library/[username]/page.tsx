/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import "@/style/dashboard.css";
import "@/style/dashboardRes.css";
import LoadingScreen from "@/components/loader/brothers-loader/LoadingScreen";
import { useJwt } from "react-jwt";
import style from "@/components/brothers/dashboard/Dashboard.module.css";
import CommentCon from "@/components/brothers/dashboard/BrotherCommentCon";
import { filterUserReadBooks } from "@/functions/stat-functions/scoreFunctions";
import { Book } from "@/types/BookInterface";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { useAppSelector } from "@/store/lib/hooks";
import BrotherBanner from "@/components/brothers/dashboard/BrotherBanner";
import BrotherBooksScored from "@/components/brothers/dashboard/BrotherBooksScored";

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

  const userReadBooks: Book[] = filterUserReadBooks(
    readBooks,
    findUser?._id
  )?.filter((book) => !handleHideScores_NoSetter(book.actualDateOfMeeting));

  const sortBooksDefault = () => {
    setFetchedData(
      userReadBooks?.sort(
        (a, b) =>
          new Date(b.dateOfMeeting).getTime() -
          new Date(a.dateOfMeeting).getTime()
      )
    );
  };

  useEffect(() => {
    sortBooksDefault();
  }, [loadingBooks, loadingUsers]);

  return (
    <>
      {loadingBooks ? (
        <LoadingScreen />
      ) : (
        <>
          <BrotherBanner
            user={findUser}
            scoreArray={scoreArray}
            readBooks={readBooks}
          />

          <div className={style.graphCon}>
            <h2 className="underline">Books scored</h2>
            {fetchedData?.length <= 0 ? (
              <LoaderNoText />
            ) : (
              <BrotherBooksScored
                user={findUser}
                fetchedData={fetchedData}
                userReadBooks={userReadBooks}
                setFetchedData={setFetchedData}
                sortBooksDefault={sortBooksDefault}
              />
            )}
          </div>

          <div className={style.commentSection}>
            <h2 className="underline">Comments</h2>
            <CommentCon
              username={findUser?.username}
              userId={findUser?._id}
              userReadBooks={userReadBooks}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
