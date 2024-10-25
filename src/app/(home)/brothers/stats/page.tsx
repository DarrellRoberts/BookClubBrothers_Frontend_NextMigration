/* eslint-disable react/react-in-jsx-scope */
"use client";
import PieChart from "@/components/graphs/brothers/PieChart";
import styles from "./stats.module.css";
import BrotherTable from "@/components/stats/brother-table/BrotherTable";
import {
  averageScore,
  unreadBookTitles,
  userReadBookTitles,
} from "@/functions/stat-functions/scoreFunctions";
import { useEffect, useState } from "react";
import LoaderNoText from "@/components/loader/LoaderNoText";
import Graph from "@/components/graphs/brothers/Graph";

const BrothersStats: React.FC = () => {
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
    <div className={loading ? "h-screen" : ""}>
      <h1 className={styles.statsTitle}>Brothers Stats</h1>
      <div className={styles.leagueCon}>
        <BrotherTable userData={userData} bookData={bookData} />
      </div>
      <div className={styles.booksStatsCon}>
        <h2>Books Read</h2>
        {loading ? (
          <LoaderNoText />
        ) : (
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
        )}
        <div>
          <h2>Average Scores</h2>
          {loading ? (
            <LoaderNoText />
          ) : (
            <Graph
              bookTitles={userData.map((user) => user.username)}
              bookScores={userData.map((user) => averageScore(user))}
              username="User"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BrothersStats;
