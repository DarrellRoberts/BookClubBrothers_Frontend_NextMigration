/* eslint-disable react/react-in-jsx-scope */
"use client"
import PieChart from "@/components/graphs/brothers/PieChart"
import styles from "@/components/brothers/stats/stats.module.css"
import BrotherTable from "@/components/stats/brother-table/BrotherTable"
import {
  unreadBookTitles,
  userReadBookTitles,
} from "@/utils/stat-functions/scoreFunctions"
import LoaderNoText from "@/components/loader/LoaderNoText"
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch"
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch"
import BrothersScores from "@/components/brothers/stats/BrothersScores"
import BrothersSuggestedBooks from "@/components/brothers/stats/BrothersSuggestedBooks"

const BrothersStats: React.FC = () => {
  const { userData, loadingUsers } = useUserFetch(
    "https://bookclubbrothers-backend.onrender.com/users",
    null
  )

  const { bookData, loadingBooks } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  )

  const readBooks = bookData?.filter((book) => book.read === true)

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
          <BrothersScores
            loadingBooks={loadingBooks}
            loadingUsers={loadingUsers}
            userData={userData}
          />
        </div>
        <div>
          <h2>Number of Suggested Books</h2>
          <BrothersSuggestedBooks
            bookData={readBooks}
            userData={userData}
            loadingBooks={loadingBooks}
            loadingUsers={loadingUsers}
          />
        </div>
      </div>
    </div>
  )
}

export default BrothersStats
