import {useState, useEffect, useContext} from "react"
import CommentButton from "./commentform/CommentButton";
import EditCommentButton from "./commentform/EditCommentButton"
import { AuthContext } from "../../../context/authContext";
import { useJwt } from "react-jwt";
import "../../../style/commentcon.css"
import "../../../style/commentconRes.css"


interface book {
    bookData: {
    author: string;
    genre: [string];
    reviewImageURL: string;
    totalScore: number;
    title: string;
    scoreRatings: {
      raterId: [string];
      rating: [number];
    };
    yearPublished: number;
    pages: number;
    read: boolean;
    dateOfMeeting: string;
    commentInfo?: {
      commentId?: [string];
      comments?: [string];
    };
},
id: string
  }

type commentObj = Record<string, number> | [string, number][];

const RatingCon:React.FC<book> = ({bookData, id}) => {

    const [users, setUserData] = useState([])
    const [addComment, setAddComment] = useState<boolean>(false)
    const [showEditComment, setShowEditComment] = useState<boolean>(false)
    const [error, setError] = useState("")

    //extracting username of user for initial rating value
    const { token } = useContext(AuthContext);  
    const { decodedToken }: { decodedToken?: { username: string} } = useJwt(token);
    const username = decodedToken?.username 

    const getData = async () => {
      try {
      const data = await fetch(`https://bookclubbrothers-backend.onrender.com/users`);
      const user = await data.json()
      setUserData(user);
      } catch (err) {
        setError(err)
        console.log(error)
      }
    }
    
    const findUser = (id) => {
    const user = users.find(user => user._id === id)
    return user ? user.username : "user not found"
    }

    const commentArr2 = bookData?.commentInfo?.commentId?.map((id) => findUser(id))

    let commentObj: commentObj = {}
    const findComment = () => {
    for (let i = 0; i < commentArr2?.length; i++) {
      commentObj[commentArr2[i]] = bookData?.commentInfo?.comments[i]
      findUser(commentObj[bookData?.commentInfo?.comments[i]])
    }
    commentObj = Object.entries(commentObj)
    return commentObj
    }
    findComment()

useEffect(() => {
getData();
}, [])

// function to find initialRating
const findCommentByUsername = (commentObj, username) => {
  const result = commentObj?.find((pair) => pair[0] === username);
  if (result) {
    return result[1]; // Return the rating if username is found
  } else {
    return false;
  }
};
const initialComment = findCommentByUsername(commentObj, username)

    return (
<>
<div className="commentCon">
    <h2 className="ratingTitle underline">Comments</h2>
    {Array.isArray(commentObj)
        ? commentObj.map(([name, value]) => (
            <>
            <li className="list-none m-2 font-bold" key={name}>
              {name}:
            </li>
            <div className="" style={{width: `${value}rem`}}>
              "{value}"</div>
            </>
          ))
        : Object.entries(commentObj).map(([name, value]) => (
            <li className="list-none mb-1 ml-2" key={name}>
              {name}: {value}
            </li>
          ))}

  {decodedToken ? (
  <div className="flex justify-center items-end mt-auto">
  {initialComment ? (
  <EditCommentButton showEditComment={showEditComment} setShowEditComment={setShowEditComment} id={id} inComment={initialComment} />
  ) : (
  <CommentButton addComment={addComment} setAddComment={setAddComment} id={id} />
  )}
  </div>
  ) : null}
</div>
</>
    )
}

export default RatingCon