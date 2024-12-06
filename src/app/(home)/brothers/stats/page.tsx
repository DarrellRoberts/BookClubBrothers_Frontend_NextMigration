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
import LoaderNoText from "@/components/loader/LoaderNoText";
import Graph from "@/components/graphs/brothers/Graph";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch";
import Filters from "@/components/graphs/brothers/Filters";
import { useEffect, useState } from "react";
import { User } from "@/types/UserInterface";

const BrothersStats: React.FC = () => {
  const { userData, loadingUsers } = useUserFetch(
    "https://bookclubbrothers-backend.onrender.com/users",
    null
  );

  const { bookData, loadingBooks } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  );

  const readBooks = bookData?.filter((book) => book.read === true);

  const userGraphData = userData ? [...userData] : [];

  const [fetchedData, setFetchedData] = useState<User[]>();

  const sortBooksLowest = () => {
    setFetchedData(
      userGraphData?.sort((a, b) => averageScore(a) - averageScore(b))
    );
  };

  const sortBooksHighest = () => {
    setFetchedData(
      userGraphData?.sort((a, b) => averageScore(a) - averageScore(b)).reverse()
    );
  };

  const sortBooksDefault = () => {
    setFetchedData(userGraphData?.sort());
  };

  useEffect(() => {
    sortBooksDefault();
  }, [loadingUsers, loadingBooks]);
  console.log(userGraphData);
  return (
    <div className={loadingUsers && loadingBooks ? "h-screen" : ""}>
      <h1 className={styles.statsTitle}>Brothers Stats</h1>
      <div className={styles.leagueCon}>
        <BrotherTable userData={userData} bookData={readBooks} />
      </div>
      <div className={styles.booksStatsCon}>
        <h2>Books Read</h2>
        {!readBooks ? (
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
                    unreadBookTitles(readBooks, user._id)?.length,
                  ]}
                  unreadBooks={unreadBookTitles(readBooks, user._id)}
                  userReadBooks={userReadBookTitles(readBooks, user._id)}
                  bookTotal={readBooks?.length}
                />
              </div>
            ))}
          </div>
        )}
        <div>
          <h2>Average Scores</h2>
          {fetchedData?.length <= 0 ? (
            <LoaderNoText />
          ) : (
            <>
              <Filters
                sortBooksDefault={sortBooksDefault}
                sortBooksHighest={sortBooksHighest}
                sortBooksLowest={sortBooksLowest}
                type="normal"
              />
              <Graph
                bookTitles={fetchedData?.map((user) => user.username)}
                bookScores={fetchedData?.map((user) => averageScore(user))}
                username="User"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrothersStats;
