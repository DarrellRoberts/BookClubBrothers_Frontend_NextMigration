import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { DoubleLeftOutlined } from "@ant-design/icons"
import Loader from "../loader/Loader"
import { AuthContext } from "../../context/authContext";
import { useJwt } from "react-jwt";

//importing form components
import PictureUploadButton from "./brotherform/PictureUploadButton"
import EditUsernameButton from "./brotherform/EditUsernameButton"
import EditCityAndCountryButton from "./brotherform/EditCityAndCountryButton"
import EditGenreButton from "./brotherform/EditGenreButton"

import Back from "../misc/Back"
import Search from "../misc/Search"
import "../../style/brothercat.css"
import "../../style/brothercatRes.css"


const Brothercat: React.FC = () => {   
const { token } = useContext(AuthContext);
const {decodedToken}: {
    decodedToken?: {
      username: string;
      _id: string;
    };
  } = useJwt(token);

const [userData, setUserData] = useState([])
const [bookData, setBookData] = useState([])
const [loading, setLoading] = useState<boolean>(true)
const [searchBar, setSearchBar] = useState("");
const [error, setError] = useState("")

// useState for edit buttons
const [imageUpload, setImageUpload] = useState<boolean>(false);
const [editUsername, setEditUsername] = useState<boolean>(false);
const [editCountry, setEditCountry] = useState<boolean>(false);
const [editGenre, setEditGenre] = useState<boolean>(false);

    const getData = async () => {
        try {
        if (searchBar) {
        const data = await fetch(`https://bookclubbrothers-backend.onrender.com/users/${searchBar}`);
        const user = await data.json()
        setUserData(user);
        setLoading(false);
        } else {
        const data = await fetch(`https://bookclubbrothers-backend.onrender.com/users`);
        const user = await data.json()
        setUserData(user);
        setLoading(false);   
        }
    } catch (err) {
        setError(err)
        console.log(error)
    }
    }

    const getBook = async () => {
        const data = await fetch(`https://bookclubbrothers-backend.onrender.com/books`);
        const user = await data.json()
        setBookData(user);
        setLoading(false);
    }

    const findBook = (id) => {
        const book = bookData.find(book => book._id === id)
        return book ? book.title : "book not found"
        }
    
    let userBookObj = {}
    const mapUserToBook = () => {
    let bookId = userData.map((user) => user?.userInfo?.books?.booksScored[user?.userInfo?.books?.booksScored.length - 1])
        bookId = bookId.map((book) => findBook(book))
        for (let i = 0; i < bookId.length; i++) {
            userBookObj[i] = bookId[i]
        }
    userBookObj = Object.entries(userBookObj)
    return userBookObj
    }
    mapUserToBook()

useEffect(() => { 
    getData();
    getBook()}, [])

const filteredResults = Array.isArray(userData)
? userData?.filter((user) => user.username.includes(searchBar))
: ["No results"];

console.log(userData)
console.log(bookData)
console.log(userBookObj)
    return (
        <>
    <div className="searchBackCon">
    <Search setSearchBar={setSearchBar} />
    <Back />
    </div>
    {loading ? (
    <Loader />
        ) : (
        <>
        <h1 className="brothersTitle">The Brothers</h1>
        <div className="flex flex-col items-center">
        {filteredResults.length > 0 ?
        filteredResults.map((user, index) => 
        (
            <div key={index} className="brotherBook border-black border-4 border-solid m-5 flex">
                
                <div className="brotherBookLeft flex flex-col justify-evenly items-center">             
                {decodedToken?._id === user?._id ? (
                    <div className="flex">
                    <EditUsernameButton setEditUsername={setEditUsername} editUsername={editUsername} inUsername={user?.username} id={user?._id}  />
                    <h2 className="text-black underline">{user?.username}</h2>
                    </div>
                ) : (
                    <h2 className="text-black underline">{user?.username}</h2>
                )}  
                <Link to={`/brothers/${user.username}`}>
                    <img
                    className="opacity-60 grayscale"
                    src={user?.userInfo?.profileURL} 
                    alt="profile_pic" /></Link>
                {decodedToken?._id === user?._id ? (
                    <div className="flex">
                        <PictureUploadButton  
                        id={user?._id} 
                        inImage={user?.userInfo?.profileURL}
                        imageUpload={imageUpload}
                        setImageUpload={setImageUpload}/>
                    </div>
                ) : null}
                </div>

                <div className="brotherBookRight flex flex-col pl-10 pt-5">
                    <ul>
                    <li className="brotherList underline pt-5">Location
                    {decodedToken?._id === user?._id ? (
                        <EditCityAndCountryButton 
                        editCountry={editCountry} 
                        setEditCountry={setEditCountry} 
                        id={user?._id} 
                        inCity={user?.userInfo?.residence?.city} 
                        inCountry={user?.userInfo?.residence?.country}  />
                    ) : null}</li>
                    <div className="flex">
                    {user?.userInfo?.residence?.city ? (
                    <li>City: {user?.userInfo?.residence?.city}</li>
                    )
                    :
                    ( 
                    <li className="text-red-500 font-bold">No city written</li>
                    )}
                    </div>

{/* Country */}
                    <div className="flex">
                    {user?.userInfo?.residence?.country ? (
                    <li>Country: {user?.userInfo?.residence?.country}</li>
                    )
                    : (
                        <li className="text-red-500 font-bold">No country written</li>
                    )}
                    </div>

                    <div className="flex">
                    <li className="brotherList underline pt-5">Favourite Genres</li>
                    {decodedToken?._id === user._id ? (
                    <EditGenreButton setEditGenre={setEditGenre} editGenre={editGenre} inGenre={user?.userInfo?.favGenre?.map(genre => genre)} id={decodedToken?._id}/>
                    ) : null}
                    </div>
                    {user?.userInfo?.favGenre?.length > 0 ? user?.userInfo?.favGenre?.map((genre) =>
                    (
                    <>
                    <li className="list-disc">{genre}</li>
                    </>
                    )) : (
                    <li className="text-red-500 font-bold">None selected</li>
                    ) }
                    <li className="brotherList underline pt-5">Last rating given</li>
                    <li>Book: {userBookObj[userData.indexOf(user)][1]}</li>
                    <li>Score: {user?.userInfo?.books?.score[user?.userInfo?.books?.score.length - 1]}</li>
                    </ul>
                    <div className="clickPhotoCon mt-auto mb-5 flex">
                        <DoubleLeftOutlined className="leftArrow text-2xl" />
                        <span className="clickPhoto">Click the photo on the left to view more details</span>
                    </div>
                </div>
            </div>
        )
        )
        : (
            <p>Brother not found. Click on search to refresh.</p>
        )}
        </div>
        </>
        )}
        </>
    )
}

export default Brothercat