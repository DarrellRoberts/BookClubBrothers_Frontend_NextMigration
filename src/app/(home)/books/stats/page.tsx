/* eslint-disable react/react-in-jsx-scope */
"use client";
import Graph from "@/components/graphs/brothers/Graph";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { genreAverageScore } from "@/functions/stat-functions/scoreFunctions";
import "@/style/bookHomepage.css";
import "@/style/bookHomepageRes.css";
import { type Book } from "@/types/BookInterface";
import { useEffect, useState } from "react";
import styles from "./bookstats.module.css";
import ScatterGraph from "@/components/graphs/brothers/ScatterGraph";

const BookStats = () => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

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
  const totalScoreArray = bookData.map((book) => book.totalScore.toFixed(2));
  const pageNumberArray = bookData.map((book) => book.pages);
  const yearPublishedArray = bookData.map((book) => book.yearPublished);
  const labelArray = bookData.map((book) => book.title);

  useEffect(() => {
    getBookData();
  }, []);
  return (
    <>
      <h1 className="booksTitle">Book Stats</h1>
      <div className={styles.booksStatsCon}>
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
    </>
  );
};

export default BookStats;
