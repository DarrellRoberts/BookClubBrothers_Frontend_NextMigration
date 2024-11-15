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
import useBookFetch from "@/hooks/fetch-hooks/useBookFetch";
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch";

const BrothersStats: React.FC = () => {
  const { userData, loading } = useUserFetch(
    "https://bookclubbrothers-backend.onrender.com/users",
    null
  );

  const { bookData } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null,
    true
  );

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
