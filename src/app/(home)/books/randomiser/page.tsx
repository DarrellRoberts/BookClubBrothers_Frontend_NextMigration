/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useContext, useReducer } from "react";
import { ACTIONS } from "./actions";
import LoaderNoText from "../../../../components/loader/LoaderNoText";
import CreateUnreadBook from "./bookform/CreateUnreadBook";
import DeleteBook from "./bookform/DeleteBook";
import Randomiser from "./Randomiser";
import { AuthContext } from "../../../../context/AuthContext";
import { useJwt } from "react-jwt";
import style from "./randomiser.module.css";
import EditUnreadBook from "./bookform/edit/EditUnreadBook";
import useBookFetch from "@/hooks/fetch-hooks/useBookFetch";
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch";

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SHOWCREATEBOOK:
      return { ...state, showCreateBook: action.payload };
    case ACTIONS.SHOWEDITBOOK:
      return { ...state, showEditBook: action.payload };
    case ACTIONS.SETINDEX:
      return { ...state, index: action.payload };
    case ACTIONS.SETERROR:
      return { ...state, error: action.payload };
    case ACTIONS.SHOWRANDOM:
      return { ...state, showRandom: action.payload };
    case ACTIONS.SETRANDOM:
      return { ...state, showRandom: action.payload };
    default:
      return state;
  }
};

const RandomiserHomepage: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, {
    showCreateBook: false,
    showEditBook: false,
    index: 0,
    error: null,
    showRandom: true,
  });

  const { token } = useContext(AuthContext);
  const {
    decodedToken,
  }: {
    decodedToken?: {
      _id: string;
      username: string;
    };
  } = useJwt(token);

  const adminId = "65723ac894b239fe25fe6871";

  const { bookData, loading } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books/unread/all",
    null,
    false
  );
  const { userData } = useUserFetch(
    "https://bookclubbrothers-backend.onrender.com/users",
    null
  );

  const findUser = (id) => {
    const user = userData.find((user) => user._id === id);
    return user ? user.username : "user not found";
  };

  return (
    <div>
      <h1 className={style.randomTitle}>Randomiser</h1>
      <div className={style.randomCon}>
        <div className={style.randomBox}>
          <div className={style.randomBoxLeft}>
            <div className={style.randomBoxLeftList}>
              {loading ? (
                <div className="flex justify-center items-center mt-20">
                  <LoaderNoText />
                </div>
              ) : (
                bookData?.map((book, i) => (
                  <div
                    key={i}
                    className={style.bookBox}
                    // add conditional as otherwise creates bug for onClick Modal
                    onClick={() =>
                      !state.showEditBook
                        ? dispatch({
                            type: ACTIONS.SETINDEX,
                            payload: bookData.indexOf(book),
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
              {!loading ? (
                <h2 className={style.adminText}>
                  Only the admin can select the book.
                </h2>
              ) : null}
            </div>
          </div>

          <div
            className={style.randomBoxRight}
            style={{
              backgroundImage: `URL(${bookData[state.index]?.imageURL})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {loading ? (
              <div className="flex justify-center items-center mt-20">
                <LoaderNoText />
              </div>
            ) : (
              <div className={style.randomDetailsCon + " bg-white"}>
                {state.error ? (
                  <h2 className="text-red-500 bg-black">{state.error}</h2>
                ) : (
                  <>
                    <h2>{bookData[state.index]?.title}</h2>
                    <ul className="text-center">
                      <li>Author: {bookData[state.index]?.author}</li>
                      <li>Published: {bookData[state.index]?.yearPublished}</li>
                      <li>Pages: {bookData[state.index]?.pages}</li>
                      <li>
                        Genre:{" "}
                        {bookData[state.index]?.genre.map((theme, i) => (
                          <li key={i}>{theme}</li>
                        ))}
                      </li>
                      <li>
                        Suggested by:{" "}
                        {findUser(bookData[state.index]?.suggestedBy) ===
                        "user not found"
                          ? " (loading...)"
                          : findUser(bookData[state.index]?.suggestedBy)}{" "}
                      </li>
                    </ul>
                    <div className={style.buttonCon}>
                      <Randomiser
                        bookLength={bookData?.length}
                        bookId={bookData[state.index]?._id}
                        userId={decodedToken?._id}
                        adminId={adminId}
                        showRandom={state.showRandom}
                        dispatch={dispatch}
                      />
                      {(state.showRandom &&
                        bookData[state.index]?.suggestedBy ===
                          decodedToken?._id) ||
                      decodedToken?._id === adminId ? (
                        <>
                          <EditUnreadBook
                            id={bookData[state.index]?._id}
                            showEditBook={state.showEditBook}
                            dispatch={dispatch}
                            inAuthor={bookData[state.index]?.author}
                            inTitle={bookData[state.index]?.title}
                            inPublished={bookData[state.index]?.yearPublished}
                            inPages={bookData[state.index]?.pages}
                            inGenre={bookData[state.index]?.genre}
                            inImageURL={bookData[state.index]?.imageURL}
                          />
                          <DeleteBook id={bookData[state.index]?._id} />
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
