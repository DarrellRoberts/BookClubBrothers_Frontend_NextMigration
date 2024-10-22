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

  useEffect(() => {
    getBookData();
  }, []);

  return (
    <>
      <h1 className="booksTitle">Book Stats</h1>
      <div className={styles.booksStatsCon}>
        <h2>Genre Scores</h2>
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
    </>
  );
};

export default BookStats;
