"use client";

import {useEffect, useContext, useReducer} from "react"
import LoaderNoText from "../../../components/loader/LoaderNoText"
import CreateUnreadBook from "./bookform/CreateUnreadBook"
import DeleteBook from "./bookform/DeleteBook"
import EditUnreadBook from "./bookform/EditUnreadBook"
import Randomiser from "./Randomiser"
import { AuthContext } from "../../../context/authContext";
import { useJwt } from "react-jwt";
import "../../../style/randomiser.css"
import "../../../style/randomiserRes.css"

export const ACTIONS = {
  SHOWCREATEBOOK: 'showCreateBook',
  SHOWEDITBOOK: 'showEditBook',
  SETINDEX: 'setIndex',
  SETBOOKDATA: 'setBookData',
  SETUSERDATA: 'setUserData',
  SETERROR: 'setError',
  SHOWLOADING: 'setLoading'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SHOWCREATEBOOK:
      return {...state, showCreateBook: action.payload};
    case ACTIONS.SHOWEDITBOOK:
      return {...state, showEditBook: action.payload};
    case ACTIONS.SETINDEX:
      return {...state, index: action.payload};
    case ACTIONS.SETBOOKDATA:
      return {...state, bookData: action.payload};
    case ACTIONS.SETUSERDATA:
      return {...state, userData: action.payload};
    case ACTIONS.SETERROR:
      return {...state, error: action.payload};
    case ACTIONS.SHOWLOADING:
      return {...state, loading: action.payload};
    default:
      return state;
  }
}

const RandomiserHomepage: React.FC = () => {

const [state, dispatch] = useReducer(reducer, {
  showCreateBook: false,
  showEditBook: false,
  index: 0,
  bookData: [],
  userData: [],
  error: null,
  loading: true,
})

const { token } = useContext(AuthContext);
const { decodedToken }: { decodedToken?: { username: string} } = useJwt(token);

const getBookData = async () => {
    try {
    dispatch({type: ACTIONS.SETERROR, payload: null})
    const data = await fetch(
      `https://bookclubbrothers-backend.onrender.com/books/unread/all`
    );
    const book = await data.json();
    dispatch({type: ACTIONS.SETBOOKDATA, payload: book})
    dispatch({type: ACTIONS.SHOWLOADING, payload: false})
  } catch (err) {
    dispatch({type: ACTIONS.SETERROR, payload: err})
    console.log(state.error)
  }
  };

const getUserData = async () => {
    try {
    dispatch({type: ACTIONS.SETERROR, payload: null})
    const data = await fetch(
      `https://bookclubbrothers-backend.onrender.com/users`, {
        cache: "force-cache"
      }
    );
    const user = await data.json();
    dispatch({type: ACTIONS.SETUSERDATA, payload: user})
    dispatch({type: ACTIONS.SHOWLOADING, payload: false})
  } catch (err) {
    dispatch({type: ACTIONS.SETERROR, payload: err})
    console.log(state.error)
  }
  };

  const findUser = (id) => {
    const user = state.userData.find(user => user._id === id)
    return user ? user.username : "user not found"
    }

useEffect(() => {
    getBookData();
    getUserData();
}, [])

    return (
<div>
  <h1 className="randomTitle">Randomiser</h1>
    <div className="randomCon">
      <div className="randomBox">
        <div className="randomBoxLeft">
          <div className="randomBoxLeftList">
        {state.bookData.length === 0 ? (
        <div className="flex justify-center items-center mt-20">
        <LoaderNoText />
        </div>
        ) : 
        state.bookData?.map((book, i) => 
        (
        <div 
        className={decodedToken ? "bookDeleteBox" : "bookBox"}
        // add conditional as otherwise creates bug for onClick Modal
        onClick={() => !state.showEditBook ? 
          dispatch({type: ACTIONS.SETINDEX, payload: state.bookData.indexOf(book)})
          : null}
        >
        <h2>{book?.title}</h2>
        {decodedToken ? (
          <div 
          key = {i}
          className="bookX">
            <DeleteBook id={book?._id} />
          </div>) : null} 
          <p> - suggested by {findUser(book?.suggestedBy) === "user not found" 
          ? " (...loading)" : findUser(book?.suggestedBy)}</p>
        </div>
        ))}
        <CreateUnreadBook 
        showCreateBook={state.showCreateBook} 
        dispatch={dispatch}
        />
        </div>

          <div className="leftBottomInfo mt-5">
            <h2 className="text-black mt-5">
            Scroll the list above for suggested books or add your own at the end
            </h2>
            <h2 className="text-black mt-5">
              Click randomise on the right to randomise the selection or click on each item in the list to see its details.
            </h2>
            <h2 className="text-red-500 bg-black mt-5 rounded">
              Only the admin can select the book.
            </h2>
          </div>
        </div>

        <div className="randomBoxRight" 
        style={{
        backgroundImage: `URL(${state.bookData[state.index]?.imageURL})`, backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
        }}>
        {state.loading ? (
          <div className="flex justify-center items-center mt-20">
          <LoaderNoText />
          </div>
          ) : (
        <div className="randomDetailsCon bg-white">
        {state.error ? (
          <h2 className="text-red-500 bg-black">{state.error}</h2>
          ) : (
          <>
            <h2>{state.bookData[state.index]?.title}</h2>
            <ul className="text-center">
              <li>Author: {state.bookData[state.index]?.author}</li>
              <li>Published: {state.bookData[state.index]?.yearPublished}</li>
              <li>Pages: {state.bookData[state.index]?.pages}</li>
              <li>Genre: {state.bookData[state.index]?.genre.map((theme, i) => (
                <li key={i}>{theme}</li>
              ))}</li>
              <li>Suggested by: {findUser(state.bookData[state.index]?.suggestedBy) === "user not found" ? 
              " (loading...)" : findUser(state.bookData[state.index]?.suggestedBy)} </li>
            </ul>
            <div className="flex">
              <Randomiser 
              bookLength={state.bookData?.length} 
              bookId={state.bookData[state.index]?._id}
              dispatch={dispatch}
              />
              <EditUnreadBook 
              dispatch={dispatch}
              showEditBook = {state.showEditBook}
              id = {state.bookData[state.index]?._id}
              prevTitle =  {state.bookData[state.index]?.title}
              prevAuthor = {state.bookData[state.index]?.author}
              prevPages= {state.bookData[state.index]?.pages}
              prevYearPublished = {state.bookData[state.index]?.yearPublished} 
              prevGenre = {state.bookData[state.index]?.genre}
              prevImageURL = {state.bookData[state.index]?.imageURL}
              />
            </div>
          </>
        )}
      </div>
      )}
    </div>
  </div>
</div>
</div>
    )
}

export default RandomiserHomepage