import { findUser } from "./findUser";

export const findComment = (bookData, userData, commentObj) => {
  if (bookData && userData) {
    const commentArray = bookData?.commentInfo?.commentId?.map((id) =>
      findUser(id, userData)
    );
    for (let i = 0; i < commentArray?.length; i++) {
      commentObj[commentArray[i]] = bookData?.commentInfo?.comments[i];
      findUser(commentObj[bookData?.commentInfo?.comments[i]], userData);
    }
    commentObj = Object.entries(commentObj);
    return commentObj;
  }
};

export const findCommentByUsername = (username, bookData, userData) => {
  if (bookData && userData) {
    let commentObj: object | string[] = {};
    findComment(bookData, userData, commentObj);
    commentObj = Object.entries(commentObj);
    const result = Array.isArray(commentObj) ? commentObj?.find((pair) => pair[0] === username) : null;
    if (result) {
      return result[1]; // Return the rating if username is found
    } else {
      return false;
    }
  }
};
