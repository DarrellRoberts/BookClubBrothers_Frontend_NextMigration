import React from "react"
import styles from "./stats.module.css"
import UsernameColumn from "./columns/UsernameColumn"
import BooksReadColumn from "./columns/BooksReadColumn"
import HighestScoreColumn from "./columns/HighestScoreColumn"
import LowestScoreColumn from "./columns/LowestScoreColumn"
import BestBookColumn from "./columns/BestBookColumn"
import {
  findBestBook,
  findWorstBook,
} from "@/utils/stat-functions/scoreFunctions"
import WorstBookColumn from "./columns/WorstBookColumn"
import { type User } from "@/types/UserInterface"
import { type Book } from "@/types/BookInterface"

type Props = {
  userData: User[]
  bookData: Book[]
}

const BrotherTableTablet: React.FC<Props> = ({ userData, bookData }) => {
  return (
    <>
      <div className={styles.leagueTableTwo}>
        <UsernameColumn usernames={userData?.map((user) => user.username)} />

        <BooksReadColumn
          userBookLength={userData?.map(
            (userBook) => userBook.userInfo?.books?.score?.length
          )}
          bookLength={bookData?.length}
        />
      </div>

      <div className={styles.leagueTableTwo}>
        <UsernameColumn usernames={userData?.map((user) => user.username)} />
        <HighestScoreColumn
          maxScoreArray={userData?.map((book) =>
            Math.max(...book.userInfo?.books?.score)
          )}
        />
      </div>

      <div className={styles.leagueTableTwo}>
        <UsernameColumn usernames={userData?.map((user) => user.username)} />
        <LowestScoreColumn
          minScoreArray={userData?.map((book) =>
            Math.min(...book.userInfo?.books?.score)
          )}
        />
      </div>

      <div className={styles.leagueTableTwo}>
        <UsernameColumn usernames={userData?.map((user) => user.username)} />
        <BestBookColumn
          bestBooks={userData?.map((user) => findBestBook(user, bookData))}
        />
      </div>

      <div className={styles.leagueTableTwo}>
        <UsernameColumn usernames={userData?.map((user) => user.username)} />
        <WorstBookColumn
          worstBooks={userData?.map((user) => findWorstBook(user, bookData))}
        />
      </div>
    </>
  )
}

export default BrotherTableTablet
