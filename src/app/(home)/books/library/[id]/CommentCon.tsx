/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState, useEffect, useContext } from "react";
import CommentButton from "./commentform/CommentButton";
import EditCommentButton from "./commentform/EditCommentButton";
import { AuthContext } from "../../../../../context/authContext";
import { useJwt } from "react-jwt";
import { type Book } from "@/types/BookInterface";
import {
  findComment,
  findCommentByUsername,
} from "@/functions/comment-functions/findComments";
import { findUserByUsername } from "@/functions/findUser";
import styles from "./commentCon.module.css";
import Link from "next/link";
import ProfileSmall from "@/components/misc/profile/ProfileSmall";

type Props = {
  bookData: Book;
  id: string;
};

const RatingCon: React.FC<Props> = ({ bookData, id }) => {
  const [users, setUserData] = useState([]);
  const [addComment, setAddComment] = useState<boolean>(false);
  const [showEditComment, setShowEditComment] = useState<boolean>(false);
  const [error, setError] = useState("");

  //extracting username of user for initial rating value
  const { token } = useContext(AuthContext);
  const { decodedToken }: { decodedToken?: { username: string } } =
    useJwt(token);
  const username = decodedToken?.username;

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

  useEffect(() => {
    getData();
  }, []);

  const commentObj: object | string[] = {};
  findComment(bookData, users, commentObj);
  const initialComment = findCommentByUsername(username, bookData, users);

  return (
    <>
      <div className={styles.commentCon}>
        <h2 className="ratingTitle underline">Comments</h2>
        {Array.isArray(commentObj)
          ? commentObj.map(([name, value]) => (
            <>
              <li className="list-none m-2 font-bold" key={name}>
                {name}:
              </li>
              <div className="" style={{ width: `${value}rem` }}>
                  "{value}"
              </div>
            </>
          ))
          : Object.entries(commentObj).map(([name, value], i) => (
            <div className={styles.commentWrap} key={i}>
              <div>
                <h3>{name}</h3>
                <Link href={`/brothers/library/${name}`}>
                  <ProfileSmall
                    imageURL={
                      findUserByUsername(name, users)?.userInfo?.profileURL
                    }
                  />
                </Link>
              </div>
              <li className="list-none mb-1 ml-2 flex items-center text-center">
                "{value}"
              </li>
            </div>
          ))}

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
