/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState } from "react";
import CommentButton from "./commentform/CommentButton";
import EditCommentButton from "./commentform/EditCommentButton";
import { useJwt } from "react-jwt";
import { type Book } from "@/types/BookInterface";
import {
  findComment,
  findCommentByUsername,
} from "@/functions/comment-functions/findComments";
import { findUserByUsername } from "@/functions/find-functions/find";
import styles from "./commentCon.module.css";
import Link from "next/link";
import ProfileSmall from "@/components/misc/profile/ProfileSmall";
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { useAppSelector } from "@/store/lib/hooks";

type Props = {
  bookData: Book;
  id: string;
  hideScores: boolean;
};

const RatingCon: React.FC<Props> = ({ bookData, id, hideScores }) => {
  const [addComment, setAddComment] = useState<boolean>(false);
  const [showEditComment, setShowEditComment] = useState<boolean>(false);

  const token = useAppSelector((state) => state.token.tokenState);
  const { decodedToken }: { decodedToken?: { username: string } } =
    useJwt(token);
  const username = decodedToken?.username;
  const { userData, loadingUsers, error } = useUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users`,
    null
  );

  const commentObj: object | string[] = {};
  findComment(bookData, userData, commentObj);
  const initialComment = findCommentByUsername(username, bookData, userData);

  return (
    <>
      <div className={styles.commentCon}>
        <h2 className="ratingTitle underline">Comments</h2>
        {error ? (
          <h2>{error.message}</h2>
        ) : loadingUsers ? (
          <LoaderNoText />
        ) : (
          Object.entries(commentObj).map(([name, value], i) => (
            <div className={styles.commentWrap} key={i}>
              <div>
                <h3>{name}</h3>
                <Link href={`/brothers/library/${name}`}>
                  <ProfileSmall
                    imageURL={
                      findUserByUsername(name, userData)?.userInfo?.profileURL
                    }
                  />
                </Link>
              </div>
              <li
                className={`${
                  hideScores && username !== name ? "text-3xl" : null
                } list-none mb-1 ml-2 flex items-center text-center`}
              >
                {hideScores && username !== name ? "?" : `"${value}"`}
              </li>
            </div>
          ))
        )}

        {decodedToken ? (
          <div className="flex justify-center items-end mt-auto">
            {initialComment ? (
              <EditCommentButton
                showEditComment={showEditComment}
                setShowEditComment={setShowEditComment}
                id={id}
                inComment={initialComment}
              />
            ) : (
              <CommentButton
                addComment={addComment}
                setAddComment={setAddComment}
                id={id}
              />
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default RatingCon;
