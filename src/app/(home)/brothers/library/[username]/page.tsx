/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useParams } from "next/navigation";
import "@/style/dashboard.css";
import "@/style/dashboardRes.css";
import LoadingScreen from "@/components/loader/brothers-loader/LoadingScreen";
import { useJwt } from "react-jwt";
import style from "@/components/brothers/dashboard/Dashboard.module.css";
import CommentCon from "@/components/brothers/dashboard/BrotherCommentCon";
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
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

  return (
    <>
      {loadingBooks ? (
        <LoadingScreen />
      ) : (
        <>
          <BrotherBanner user={findUser} readBooks={readBooks} />

          <div className={style.graphCon}>
            <h2 className="underline">Books scored</h2>
            <BrotherBooksScored
              user={findUser}
              loadingBooks={loadingBooks}
              loadingUsers={loadingUsers}
              readBooks={readBooks}
            />
          </div>

          <div className={style.commentSection}>
            <h2 className="underline">Comments</h2>
            <CommentCon
              username={findUser?.username}
              userId={findUser?._id}
              readBooks={readBooks}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
