/* eslint-disable react/react-in-jsx-scope */
"use client";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import "@/style/bookHomepage.css";
import "@/style/bookHomepageRes.css";
import styles from "@/components/books/stats/bookstats.module.css";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
import BookStatsTotalScores from "@/components/books/stats/BookStatsTotalScores";
import BookStatsGenre from "@/components/books/stats/BookStatsGenre";
import BookStatsPages from "@/components/books/stats/BookStatsPages";
import BookStatsYrPublished from "@/components/books/stats/BookStatsYrPublished";
import BookStatsMeetingDate from "@/components/books/stats/BookStatsMeetingDate";

const BookStats = () => {
  const { bookData, loadingBooks } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  );

  const readBooks = bookData?.filter(
    (book) =>
      book.read === true && !handleHideScores_NoSetter(book.actualDateOfMeeting)
  );

  return (
    <div className={loadingBooks ? "h-screen" : ""}>
      <h1 className="booksTitle">Book Stats</h1>
      <div className={styles.booksStatsCon}>
        <div className="flex flex-col justify-self-center">
          <h2>Total Scores</h2>
          <BookStatsTotalScores
            bookData={bookData}
            loadingBooks={loadingBooks}
          />
        </div>

        <div className="flex flex-col justify-self-center">
          <h2>By Genre</h2>
          <BookStatsGenre readBooks={readBooks} />
        </div>

        <div className="flex flex-col justify-self-center">
          <h2>By Number of Pages</h2>
          <BookStatsPages readBooks={readBooks} loadingBooks={loadingBooks} />
        </div>

        <div className="flex flex-col justify-self-center">
          <h2>By Year Published</h2>
          <BookStatsYrPublished
            readBooks={readBooks}
            loadingBooks={loadingBooks}
          />
        </div>
      </div>

      <div className={styles.meetingDateCon}>
        <h2>By Meeting Date</h2>
        <BookStatsMeetingDate
          readBooks={readBooks}
          loadingBooks={loadingBooks}
        />
      </div>
    </div>
  );
};

export default BookStats;
