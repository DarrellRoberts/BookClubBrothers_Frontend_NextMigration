/* eslint-disable react/react-in-jsx-scope */
"use client";
import { useEffect, useState } from "react";
import "@/style/bookHomepage.css";
import "@/style/bookHomepageRes.css";
import PieChart from "@/components/graphs/brothers/PieChart";
import {
  unreadBookTitles,
  userReadBookTitles,
} from "@/functions/stat-functions/scoreFunctions";
import LoaderNoText from "@/components/loader/LoaderNoText";
import styles from "./bookstats.module.css";

const BookStats = () => {
  const [userData, setUserData] = useState([]);
  const [bookData, setBookData] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const getUserData = async () => {
    try {
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/users`
      );
      const user = await data.json();
      setUserData(user);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  const getBookData = async () => {
    try {
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/books`
      );
      const book = await data.json();
      const readBooks = book.filter((item) => item.read === true);
      setBookData(readBooks);
      setLoading(false);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
    getBookData();
  }, []);

  return (
    <>
      <h1 className="booksTitle">Book Stats</h1>
      {loading ? (
        <LoaderNoText />
      ) : (
        <div className={styles.booksStatsCon}>
          <h2>Books Read</h2>
          <div className={styles.booksReadCon}>
            {userData?.map((user, i) => (
              <div key={i}>
                <h3 className={styles.booksReadUsername}>{user.username}</h3>
                <PieChart
                  key={i}
                  booksRead={[
                    user.userInfo.books.score.length,
                    unreadBookTitles(bookData, user._id).length,
                  ]}
                  unreadBooks={unreadBookTitles(bookData, user._id)}
                  userReadBooks={userReadBookTitles(bookData, user._id)}
                  bookTotal={bookData.length}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BookStats;
