"use client";

import {useState, useEffect, useContext} from "react"
import LoaderNoText from "../../../components/loader/LoaderNoText"
import CreateUnreadBook from "./bookform/CreateUnreadBook"
import DeleteBook from "./bookform/DeleteBook"
import Randomiser from "./Randomiser"
import { AuthContext } from "../../../context/authContext";
import { useJwt } from "react-jwt";
import "../../../style/randomiser.css"
import "../../../style/randomiserRes.css"

const RandomiserHomepage: React.FC = () => {
const [showCreateBook, setShowCreateBook] = useState(false)
const [index, setIndex] = useState(0)
const [bookData, setBookData] = useState([])
const [userData, setUserData] = useState([])
const [error, setError] = useState(null)
const [loading, setLoading] = useState(true)

const { token } = useContext(AuthContext);
const { decodedToken }: { decodedToken?: { username: string} } = useJwt(token);

const getBookData = async () => {
    try {
    setError(null)
    const data = await fetch(
      `https://bookclubbrothers-backend.onrender.com/books/unread/all`, {
        cache: "force-cache"
      }
    );
    const book = await data.json();
    setBookData(book);
    setLoading(false);
  } catch (err) {
    setError(err)
    console.log(error)
  }
  };

const getUserData = async () => {
    try {
    setError(null)
    const data = await fetch(
      `https://bookclubbrothers-backend.onrender.com/users`, {
        cache: "force-cache"
      }
    );
    const book = await data.json();
    setUserData(book);
    setLoading(false);
  } catch (err) {
    setError(err)
    console.log(error)
  }
  };

  const findUser = (id) => {
    const user = userData.find(user => user._id === id)
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
                {loading ? (
                  <div className="flex justify-center items-center mt-20">
                  <LoaderNoText />
                  </div>
                ) : 
                bookData?.map((book) => 
                (
                <>
                <div 
                className={decodedToken ? "bookDeleteBox" : "bookBox"}
                onClick={() => setIndex(bookData.indexOf(book))}
                >
                <h2>{book?.title}</h2>
                {decodedToken ? (
                <div 
                className="bookX"
                ><DeleteBook id={book?._id} /></div>) : null} 
                <p> - suggested by {findUser(book?.suggestedBy)}</p>
                </div>
                </>
                ))
                }
                <CreateUnreadBook 
                showCreateBook={showCreateBook} 
                setShowCreateBook={setShowCreateBook}/>
                </div>
                <div className="randomBoxRight" 
                style={{
                  backgroundImage: `URL(${bookData[index]?.imageURL})`, backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  maxHeight: "750px"}}>
                {loading ? (
                  <div className="flex justify-center items-center mt-20">
                  <LoaderNoText />
                  </div>
                ) : (
                  <div className="randomDetailsCon bg-white">
                    <h2>{bookData[index]?.title}</h2>
                    <ul className="text-center">
                      <li>Author: {bookData[index]?.author}</li>
                      <li>Published: {bookData[index]?.yearPublished}</li>
                      <li>Pages: {bookData[index]?.pages}</li>
                      <li>Genre: {bookData[index]?.genre.map((theme) => (
                        <li>{theme}</li>
                      ))}</li>
                      <li>Suggested by: {findUser(bookData[index]?.suggestedBy)} </li>
                    </ul>
                    <Randomiser bookLength={bookData?.length} bookId={bookData[index]?._id} setIndex={setIndex}/>
                    </div>
                    
                  )
                }
                </div>
            </div>
        </div>
        </div>
    )
}

export default RandomiserHomepage