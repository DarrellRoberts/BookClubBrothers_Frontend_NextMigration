/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useEffect, useContext, useReducer } from "react";
import { ACTIONS } from "./actions";
import LoaderNoText from "../../../../components/loader/LoaderNoText";
import CreateUnreadBook from "./bookform/CreateUnreadBook";
import DeleteBook from "./bookform/DeleteBook";
import Randomiser from "./Randomiser";
import { AuthContext } from "../../../../context/AuthContext";
import { useJwt } from "react-jwt";
import style from "./randomiser.module.css";
import EditUnreadBook from "./bookform/edit/EditUnreadBook";

const reducer = (state, action) => {
  switch (action.type) {
  case ACTIONS.SHOWCREATEBOOK:
    return { ...state, showCreateBook: action.payload };
  case ACTIONS.SHOWEDITBOOK:
    return { ...state, showEditBook: action.payload };
  case ACTIONS.SETINDEX:
    return { ...state, index: action.payload };
  case ACTIONS.SETBOOKDATA:
    return { ...state, bookData: action.payload };
  case ACTIONS.SETUSERDATA:
    return { ...state, userData: action.payload };
  case ACTIONS.SETERROR:
    return { ...state, error: action.payload };
  case ACTIONS.SETLOADING:
    return { ...state, showLoading: action.payload };
  case ACTIONS.SHOWRANDOM:
    return { ...state, showRandom: action.payload };
  case ACTIONS.SETRANDOM:
    return { ...state, showRandom: action.payload };
  case ACTIONS.SHOWLOADING:
    return { ...state, showLoading: action.payload };
  default:
    return state;
  }
};

const RandomiserHomepage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    showCreateBook: false,
    showEditBook: false,
    index: 0,
    bookData: [],
    userData: [],
    error: null,
    showLoading: true,
    showRandom: true,
  });

  const { token } = useContext(AuthContext);
  const { decodedToken }: { decodedToken?: {
    _id: string; username: string
} } =
    useJwt(token);

  const adminId = "65723ac894b239fe25fe6871";
  const getBookData = async () => {
    try {
      dispatch({ type: ACTIONS.SETERROR, payload: null });
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/books/unread/all`
      );
      const book = await data.json();
      dispatch({ type: ACTIONS.SETBOOKDATA, payload: book });
      dispatch({ type: ACTIONS.SETLOADING, payload: false });
    } catch (err) {
      dispatch({ type: ACTIONS.SETERROR, payload: err });
      console.log(state.error);
    }
  };

  const getUserData = async () => {
    try {
      dispatch({ type: ACTIONS.SETERROR, payload: null });
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/users`,
        {
          cache: "force-cache",
        }
      );
      const user = await data.json();
      dispatch({ type: ACTIONS.SETUSERDATA, payload: user });
      dispatch({ type: ACTIONS.SETLOADING, payload: false });
    } catch (err) {
      dispatch({ type: ACTIONS.SETERROR, payload: err });
      console.log(state.error);
    }
  };

  const findUser = (id) => {
    const user = state.userData.find((user) => user._id === id);
    return user ? user.username : "user not found";
  };

  useEffect(() => {
    getBookData();
    getUserData();
  }, []);

  return (
    <div>
      <h1 className={style.randomTitle}>Randomiser</h1>
      <div className={style.randomCon}>
        <div className={style.randomBox}>
          <div className={style.randomBoxLeft}>
            <div className={style.randomBoxLeftList}>
              {state.showLoading ? (
                <div className="flex justify-center items-center mt-20">
                  <LoaderNoText />
                </div>
              ) : (
                state.bookData?.map((book, i) => (
                  <div
                    key={i}
                    className={style.bookBox}
                    // add conditional as otherwise creates bug for onClick Modal
                    onClick={() =>
                      !state.showEditBook
                        ? dispatch({
                          type: ACTIONS.SETINDEX,
                          payload: state.bookData.indexOf(book),
                        })
                        : null
                    }
                  >
                    <h2>{book?.title}</h2>
                    <p>
                      - suggested by{" "}
                      {findUser(book?.suggestedBy) === "user not found"
                        ? " (...loading)"
                        : findUser(book?.suggestedBy)}
                    </p>
                  </div>
                ))
              )}
              {decodedToken ? (
                <CreateUnreadBook
                  showCreateBook={state.showCreateBook}
                  dispatch={dispatch}
                />
              ) : null}
            </div>

            <div className={style.leftBottomInfo + " mt-5"}>
              <h2 className="text-black mt-5">
                Scroll the list above for suggested books or add your own at the
                end
              </h2>
              <h2 className="text-black mt-5">
                Click randomise on the right to randomise the selection or click
                on each item in the list to see its details.
              </h2>
              {!state.showLoading ? (
                <h2 className="text-red-500 bg-black mt-5 rounded">
                Only the admin can select the book.
                </h2>
              ) : null}
            </div>
          </div>

          <div
            className={style.randomBoxRight}
            style={{
              backgroundImage: `URL(${state.bookData[state.index]?.imageURL})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {state.showLoading ? (
              <div className="flex justify-center items-center mt-20">
                <LoaderNoText />
              </div>
            ) : (
              <div className={style.randomDetailsCon + " bg-white"}>
                {state.error ? (
                  <h2 className="text-red-500 bg-black">{state.error}</h2>
                ) : (
                  <>
                    <h2>{state.bookData[state.index]?.title}</h2>
                    <ul className="text-center">
                      <li>Author: {state.bookData[state.index]?.author}</li>
                      <li>
                        Published: {state.bookData[state.index]?.yearPublished}
                      </li>
                      <li>Pages: {state.bookData[state.index]?.pages}</li>
                      <li>
                        Genre:{" "}
                        {state.bookData[state.index]?.genre.map((theme, i) => (
                          <li key={i}>{theme}</li>
                        ))}
                      </li>
                      <li>
                        Suggested by:{" "}
                        {findUser(state.bookData[state.index]?.suggestedBy) ===
                        "user not found"
                          ? " (loading...)"
                          : findUser(
                            state.bookData[state.index]?.suggestedBy
                          )}{" "}
                      </li>
                    </ul>
                    <div className={style.buttonCon}>
                      <Randomiser
                        bookLength={state.bookData?.length}
                        bookId={state.bookData[state.index]?._id}
                        userId={decodedToken?._id}
                        adminId={adminId}
                        showRandom={state.showRandom}
                        dispatch={dispatch}
                      />
                      {state.showRandom && state.bookData[state.index]?.suggestedBy ===
                      decodedToken?._id || decodedToken?._id === adminId ? (
                          <>
                            <EditUnreadBook
                              id={state.bookData[state.index]?._id}
                              showEditBook={state.showEditBook}
                              dispatch={dispatch}
                              inAuthor={state.bookData[state.index]?.author}
                              inTitle={state.bookData[state.index]?.title}
                              inPublished={
                                state.bookData[state.index]?.yearPublished
                              }
                              inPages={state.bookData[state.index]?.pages}
                              inGenre={state.bookData[state.index]?.genre}
                              inImageURL={state.bookData[state.index]?.imageURL}
                            />
                            <DeleteBook id={state.bookData[state.index]?._id} />
                          </>
                        ) : null}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomiserHomepage;
