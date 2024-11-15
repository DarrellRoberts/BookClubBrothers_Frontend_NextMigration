/* eslint-disable react/react-in-jsx-scope */
"use client";
import Graph from "@/components/graphs/brothers/Graph";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { genreAverageScore } from "@/functions/stat-functions/scoreFunctions";
import "@/style/bookHomepage.css";
import "@/style/bookHomepageRes.css";
import styles from "./bookstats.module.css";
import ScatterGraph from "@/components/graphs/brothers/ScatterGraph";
import useBookFetch from "@/hooks/fetch-hooks/useBookFetch";

const BookStats = () => {
  const { bookData, loading } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null,
    true
  );

  const genreArray: string[] = [
    "Horror",
    "Thriller",
    "Comedy",
    "Romance",
    "Fantasy",
    "Adventure",
    "Anti-war",
    "Drama",
    "Action",
    "Science-fiction",
    "Dystopian",
    "Postmodern",
    "Anthology",
    "Non-fiction",
  ];
  const genreAvgScoreArray = genreArray.map((genre) =>
    genreAverageScore(bookData, genre)
  );
  const totalScoreArray = bookData?.map((book) => book.totalScore?.toFixed(2));
  const pageNumberArray = bookData?.map((book) => book.pages);
  const yearPublishedArray = bookData?.map((book) => book.yearPublished);
  const labelArray = bookData?.map((book) => book.title);

  return (
    <div className={loading ? "h-screen" : ""}>
      <h1 className="booksTitle">Book Stats</h1>
      <div className={styles.booksStatsCon}>
        <div className="flex flex-col justify-self-center">
          <h2>Total Scores</h2>
          {loading ? (
            <LoaderNoText />
          ) : (
            <>
              <Graph
                bookTitles={bookData.map((book) => book.title)}
                bookScores={totalScoreArray}
                username="Total Scores"
              />
            </>
          )}
        </div>
        <div className="flex flex-col justify-self-center">
          <h2>By Genre</h2>
          {loading ? (
            <LoaderNoText />
          ) : (
            <>
              <Graph
                bookTitles={genreArray}
                bookScores={genreAvgScoreArray}
                username="Genre"
              />
            </>
          )}
        </div>
        <div className="flex flex-col justify-self-center">
          <h2>By Number of Pages</h2>
          {loading ? (
            <LoaderNoText />
          ) : (
            <ScatterGraph
              labelArray={labelArray}
              pagesArray={pageNumberArray}
              scoreArray={totalScoreArray}
              xAxes={"Number of Pages"}
              xMax={500}
              xMin={100}
            />
          )}
        </div>
        <div className="flex flex-col justify-self-center">
          <h2>By Year Published</h2>
          {loading ? (
            <LoaderNoText />
          ) : (
            <ScatterGraph
              labelArray={labelArray}
              pagesArray={yearPublishedArray}
              scoreArray={totalScoreArray}
              xAxes={"Year the Book was Published"}
              xMax={2030}
              xMin={1850}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookStats;
