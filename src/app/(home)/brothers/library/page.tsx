/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState, useContext, useReducer, useMemo } from "react";
import Link from "next/link";
import { DoubleLeftOutlined } from "@ant-design/icons";
import Loader from "../../../../components/loader/Loader";
import { AuthContext } from "../../../../context/AuthContext";
import { useJwt } from "react-jwt";

import { findBook, findDateOfMeeting } from "@/functions/find-functions/find";

//importing form components
import PictureUploadButton from "./brotherform/PictureUploadButton";
import EditUsernameButton from "./brotherform/EditUsernameButton";
import EditCityAndCountryButton from "./brotherform/EditCityAndCountryButton";
import EditGenreButton from "./brotherform/EditGenreButton";

import Search from "../../../../components/misc/search/Search";
import "../../../../style/brothercat.css";
import "../../../../style/brothercatRes.css";
import "../../../../style/search.css";
import "../../../../style/searchRes.css";
import "../../../../style/button.css";
import LoaderNoText from "@/components/loader/LoaderNoText";
import ProfileUnknownUserImage from "@/assets/Profile.unknown-profile-image.jpg";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch";

type StateType = {
  showImage: boolean;
  showUsername: boolean;
  showCountry: boolean;
  showGenre: boolean;
};

const reducer = (state: StateType, action) => {
  switch (action.type) {
    case "toggleImage":
      return { showImage: !state.showImage };
    case "toggleUsername":
      return { showUsername: !state.showUsername };
    case "toggleCountry":
      return { showCountry: !state.showCountry };
    case "toggleGenre":
      return { showGenre: !state.showGenre };
    default:
      return state;
  }
};

const Brothercat: React.FC = () => {
  const { token } = useContext(AuthContext);
  const {
    decodedToken,
  }: {
    decodedToken?: {
      username: string;
      _id: string;
    };
  } = useJwt(token);

  const [searchBar, setSearchBar] = useState("");

  const { userData, loadingUsers } = useUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users/${searchBar}`,
    searchBar
  );

  const { bookData, loadingBooks } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  );

  const readBooks = bookData?.filter((book) => book.read === true);

  const [state, dispatch] = useReducer(reducer, {
    showImage: false,
    showUsername: false,
    showCountry: false,
    showGenre: false,
  });

  let userBookObj = {};
  useMemo(() => {
    let bookId = userData?.map(
      (user) =>
        user?.userInfo?.books?.booksScored[
          user?.userInfo?.books?.booksScored.length - 1
        ]
    );
    bookId = bookId?.map((book) => findBook(book, readBooks));
    for (let i = 0; i < bookId?.length; i++) {
      userBookObj[i] = bookId[i];
    }
    userBookObj = Object.entries(userBookObj);
    return userBookObj;
  }, [readBooks]);

  const filteredResults = Array.isArray(userData)
    ? userData?.filter((user) => user?.username?.includes(searchBar))
    : ["No results"];

  return (
    <>
      <div className="searchBackCon">
        <Search setSearchBar={setSearchBar} />
      </div>
      {loadingUsers && loadingBooks ? (
        <Loader />
      ) : (
        <>
          <h1 className="brothersTitle">Brothers Library</h1>
          <div className="flex flex-col items-center">
            {filteredResults.length > 0 ? (
              filteredResults.map((user, index) => (
                <div
                  key={index}
                  className="brotherBook border-4 border-solid m-5 flex"
                >
                  <div className="brotherBookLeft flex flex-col justify-evenly items-center">
                    {decodedToken?._id === user?._id ? (
                      <div className="flex">
                        <EditUsernameButton
                          dispatch={dispatch}
                          showUsername={state.showUsername}
                          inUsername={user?.username}
                          id={user?._id}
                        />
                        <h2 className="text-black underline">
                          {user?.username}
                        </h2>
                      </div>
                    ) : (
                      <h2 className="text-black underline">{user?.username}</h2>
                    )}
                    <Link href={`/brothers/library/${user.username}`}>
                      <img
                        src={
                          user?.userInfo?.profileURL
                            ? user?.userInfo?.profileURL
                            : ProfileUnknownUserImage.src
                        }
                        alt="profile_pic"
                      />
                    </Link>
                    {decodedToken?._id === user?._id ? (
                      <div className="flex">
                        <PictureUploadButton
                          id={user?._id}
                          inImage={user?.userInfo?.profileURL}
                          showImage={state.showImage}
                          dispatch={dispatch}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="brotherBookRight flex flex-col pl-10 pt-5">
                    <ul>
                      <li className="brotherList underline pt-5">
                        Location
                        {decodedToken?._id === user?._id ? (
                          <EditCityAndCountryButton
                            showCountry={state.showCountry}
                            dispatch={dispatch}
                            id={user?._id}
                            inCity={user?.userInfo?.residence?.city}
                            inCountry={user?.userInfo?.residence?.country}
                          />
                        ) : null}
                      </li>
                      <div className="flex">
                        {user?.userInfo?.residence?.city ? (
                          <li>City: {user?.userInfo?.residence?.city}</li>
                        ) : (
                          <li className="text-red-500 font-bold">
                            No city written
                          </li>
                        )}
                      </div>

                      {/* Country */}
                      <div className="flex">
                        {user?.userInfo?.residence?.country ? (
                          <li>Country: {user?.userInfo?.residence?.country}</li>
                        ) : (
                          <li className="text-red-500 font-bold">
                            No country written
                          </li>
                        )}
                      </div>

                      <div className="flex">
                        <li className="brotherList underline pt-5">
                          Favourite Genres
                        </li>
                        {decodedToken?._id === user._id ? (
                          <EditGenreButton
                            dispatch={dispatch}
                            showGenre={state.showGenre}
                            inGenre={user?.userInfo?.favGenre?.map(
                              (genre) => genre
                            )}
                            id={decodedToken?._id}
                          />
                        ) : null}
                      </div>
                      {user?.userInfo?.favGenre?.length > 0 ? (
                        user?.userInfo?.favGenre?.map((genre) => (
                          <>
                            <li className="list-disc">{genre}</li>
                          </>
                        ))
                      ) : (
                        <li className="text-red-500 font-bold">
                          None selected
                        </li>
                      )}
                      <li className="brotherList underline pt-5">
                        Last rating given
                      </li>
                      <li>
                        Book:{" "}
                        {Object.keys(userBookObj).length !== 0 ? (
                          userBookObj[userData?.indexOf(user)][1]
                        ) : (
                          <LoaderNoText />
                        )}
                      </li>
                      <li>
                        Score:
                        {Object.keys(userBookObj).length !== 0 &&
                        handleHideScores_NoSetter(
                          findDateOfMeeting(
                            userBookObj[userData?.indexOf(user)][1],
                            readBooks
                          )
                        )
                          ? " ?"
                          : ` ${
                              user?.userInfo?.books?.score[
                                user?.userInfo?.books?.score.length - 1
                              ]
                            }`}
                      </li>
                    </ul>
                    <div className="clickPhotoCon mt-auto mb-5 flex">
                      <DoubleLeftOutlined className="leftArrow text-2xl" />
                      <span className="clickPhoto">
                        Click the photo on the left to view more details
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-screen">
                <p>Brother not found. Click search twice to refresh.</p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Brothercat;
