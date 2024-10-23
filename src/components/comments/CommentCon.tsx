/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Link from "next/link";
import style from "./CommentCon.module.css";

type Props = {
  username: string;
  comments: {
    _id: string;
    title: string;
    commentInfo: {
      commentId: string[];
      comments: string[];
    };
  }[];
  userId: string;
};

const CommentCon: React.FC<Props> = ({ username, comments, userId }) => {
  return (
    <div className={style.commentCon}>
      {comments.length > 0 ? (
        comments.map((book, i) => (
          <Link key={i} href={`/books/library/${book._id}`}>
            <div className={style.commentItem} key={i}>
              <h3>{book.title}</h3>
              <div className={style.commentRow}>
                <p>
                  "
                  {
                    book?.commentInfo.comments[
                      book?.commentInfo?.commentId?.indexOf(userId)
                    ]
                  }
                  "
                </p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className={style.commentItem}>
          <h3 className={style.noComment}>
            {username} has written no comments.
            <br/ >
            {username}, if you're reading
            this,{" "}
            <Link href="/books/library"> click here to access the book library </Link>{" "}
            and get writing!
          </h3>
        </div>
      )}
    </div>
  );
};

export default CommentCon;
