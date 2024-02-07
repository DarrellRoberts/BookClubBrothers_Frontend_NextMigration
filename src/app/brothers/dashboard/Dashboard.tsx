import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/authContext";
import { useJwt } from "react-jwt";
import LoaderNoText from "../../loader/LoaderNoText";
import "../../../style/dashboard.css";

const Dashboard: React.FC = () => {
  const [userData, setUserData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);

  const {
    decodedToken,
  }: {
    decodedToken?: {
      username: string;
      _id: string;
    };
  } = useJwt(token);

  const getData = async () => {
    try {
    const data = await fetch(
      `https://bookclubbrothers-backend.onrender.com/users`
    );
    const user = await data.json();
    setUserData(user);
    } catch (err) {
      setError(err)
      console.log(error)
    }
  };
  const id: string = decodedToken?._id;
  const findUser = userData.find((user) => user._id === id);

  // find min score
  // use index in books scored
  // fetch book data

  const scoreArray = findUser?.userInfo?.books?.score;

  //minScore
  const minScore1 =
    Array.isArray(scoreArray) && scoreArray.length > 0
      ? Math.min(...scoreArray)
      : undefined;
  const minScoreIndex = scoreArray?.indexOf(minScore1)
    ? scoreArray.indexOf(minScore1)
    : 0;
  const minScoreBook = findUser?.userInfo?.books?.booksScored[minScoreIndex];

  //maxScore
  const maxScore1 =
    Array.isArray(scoreArray) && scoreArray.length > 0
      ? Math.max(...scoreArray)
      : undefined;
  const maxScoreIndex = scoreArray?.indexOf(maxScore1)
    ? scoreArray.indexOf(maxScore1)
    : 0;
  const maxScoreBook = findUser?.userInfo?.books?.booksScored[maxScoreIndex];

  const getBookData = async () => {
    try {
    const data = await fetch(
      `https://bookclubbrothers-backend.onrender.com/books`
    );
    const book = await data.json();
    setBookData(book);
    setLoading(false);
    } catch (err) {
      setError(err)
      console.log(err)
    }
  };

  const findMinBook = bookData.find((book) => book._id === minScoreBook);
  const findMaxBook = bookData.find((book) => book._id === maxScoreBook);
  const readBooks = bookData.filter((book) => book.read === true)

  //Additional Stats
  const percentageBooks = parseFloat(
    (
      (findUser?.userInfo?.books?.score?.length / readBooks?.length) *
      100
    ).toFixed(2)
  );
  const averageScore = parseFloat(
    (
      findUser?.userInfo?.books?.score?.reduce((a, c) => a + c, 0) /
      findUser?.userInfo?.books?.score?.length
    ).toFixed(2)
  );

  // all scores
  const filterBooks = bookData.filter((book) =>
    book.scoreRatings.raterId.includes(decodedToken._id)
  );

  //unread books
  const filterUnreadBooks = bookData.filter(
    (book) => !book.scoreRatings.raterId.includes(decodedToken._id) && book.read === true
  );

  // comments
  const filterComments = bookData.filter((book) =>
    book.commentInfo.commentId.includes(decodedToken._id)
  );

  useEffect(() => {
    getData();
    getBookData();
  }, []);

  return (
    <>
      {loading ? (
      <>
      <div className="flex m-10">
      <LoaderNoText />
      </div>
      <div className="box">
            <div className="boxItem">
              <h2 className="underline">Worst rated book</h2>
            <LoaderNoText />
            </div>

            <div className="boxItem">
              <h2 className="underline">Best rated book</h2>
            <LoaderNoText />
            </div>

            <div className="boxItem">
              <h2>Share of books read:</h2>
              <h2>Average Score:</h2>
              <LoaderNoText />
            </div>
          </div>

          <div className="flex">
            <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
              <Link to="/books">
                <h2>The Books</h2>
              </Link>
            </div>

            <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
              <Link to="/brothers">
                <h2>The Brothers</h2>
              </Link>
            </div>
          </div>

          <div className="m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <h2 className="underline">Books scored</h2>
            <LoaderNoText />
          </div>

          <div className="m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <h2 className="underline">Unread Books</h2>
            <LoaderNoText />
          </div>

          <div className="m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <h2 className="underline">Comments</h2>
            <LoaderNoText />
          </div>
      </>
      ) : (
        <>
          <h1 className="dashboardTitle">{findUser?.username}</h1>
          <div className="box">
            <div className="boxItem">
              <h2 className="underline">Worst rated book</h2>
              <h2>{findMinBook?.title}</h2>
              <ul>
                <li>Author: {findMinBook?.author}</li>
                <li>Score: {minScore1}</li>
                <li>Total Score: {findMinBook?.totalScore}</li>
              </ul>
            </div>

            <div className="boxItem">
              <h2 className="underline">Best rated book</h2>
              <h2>{findMaxBook?.title}</h2>
              <ul>
                <li>Author: {findMaxBook?.author}</li>
                <li>Score: {maxScore1}</li>
                <li>Total Score: {findMaxBook?.totalScore}</li>
              </ul>
            </div>

            <div className="boxItem">
              <h2>Share of books read: {percentageBooks}%</h2>
              <h2>Average Score: {averageScore}</h2>
            </div>
          </div>

          <div className="flex">
            <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
              <Link to="/books">
                <h2>The Books</h2>
              </Link>
            </div>

            <div className="libaryButtons m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
              <Link to="/brothers">
                <h2>The Brothers</h2>
              </Link>
            </div>
          </div>

          <div className="m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <h2 className="underline">Books scored</h2>
            <ul>
              {filterBooks.map((book) => (
                <li
                  className={
                    book?.scoreRatings?.rating[
                      book?.scoreRatings?.raterId.indexOf(decodedToken._id)
                    ] >= 5
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {book.title}:{" "}
                  {
                    book?.scoreRatings?.rating[
                      book?.scoreRatings?.raterId.indexOf(decodedToken._id)
                    ]
                  }{" "}
                </li>
              ))}
            </ul>
          </div>

          <div className="m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <h2 className="underline">Unread Books</h2>
            <ul>
              {filterUnreadBooks.length === 0 ? (
                <li> You're up to date, well done!</li>
              ) : (
                filterUnreadBooks.map((book) => <li>{book.title}</li>)
              )}
            </ul>
          </div>

          <div className="m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
            <h2 className="underline">Comments</h2>
            <ul>
              {filterComments.length === 0 ? (
                <li> You have written no comments</li>
              ) : (
                filterComments.map((book) => (
                  <li>
                    {book.title}: "
                    {
                      book.commentInfo.comments[
                        book?.commentInfo?.commentId?.indexOf(decodedToken._id)
                      ]
                    }
                    "
                  </li>
                ))
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
