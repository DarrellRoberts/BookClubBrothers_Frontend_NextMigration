/* eslint-disable react/react-in-jsx-scope */
"use client";
import Graph from "@/components/graphs/brothers/Graph";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { genreAverageScore } from "@/functions/stat-functions/scoreFunctions";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import "@/style/bookHomepage.css";
import "@/style/bookHomepageRes.css";
import styles from "./bookstats.module.css";
import ScatterGraph from "@/components/graphs/brothers/ScatterGraph";
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch";
import Filters from "@/components/graphs/brothers/Filters";
import { useEffect, useState } from "react";
import { Book } from "@/types/BookInterface";
import LineGraph from "@/components/graphs/brothers/LineGraph";
import { dateFormatter } from "@/functions/time-functions/dateFormatter";

const BookStats = () => {
  const { bookData, loadingBooks } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  );

  const readBooks = bookData?.filter(
    (book) =>
      book.read === true && !handleHideScores_NoSetter(book.dateOfMeeting)
  );

  const [fetchedData, setFetchedData] = useState<Book[]>();

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
    genreAverageScore(readBooks, genre)
  );
  const totalScoreArray = readBooks?.map((book) => book.totalScore?.toFixed(2));
  const pageNumberArray = readBooks?.map((book) => book.pages);
  const yearPublishedArray = readBooks?.map((book) => book.yearPublished);
  const dateArray = readBooks?.map((book) =>
    dateFormatter(book.actualDateOfMeeting)
  );
  const labelArray = readBooks?.map((book) => book.title);

  const yearArray: string[] = dateArray
    ?.map((date) => date.split(" ")[3])
    .reverse();
  const yearMatchArray: string[] = [...new Set(yearArray)];
  const findYearCount = (year: string, yearArray: string[]): number => {
    return yearArray.filter((yr) => yr === year).length;
  };

  const sortBooksLowest = () => {
    setFetchedData(readBooks?.sort((a, b) => a.totalScore - b.totalScore));
  };

  const sortBooksHighest = () => {
    setFetchedData(
      readBooks?.sort((a, b) => a.totalScore - b.totalScore).reverse()
    );
  };

  const sortBooksDefault = () => {
    setFetchedData(
      readBooks?.sort(
        (a, b) =>
          new Date(b.dateOfMeeting).getTime() -
          new Date(a.dateOfMeeting).getTime()
      )
    );
  };

  const sortBooksOther = () => {
    setFetchedData(
      readBooks?.sort(
        (a, b) =>
          new Date(a.dateOfMeeting).getTime() -
          new Date(b.dateOfMeeting).getTime()
      )
    );
  };

  useEffect(() => {
    sortBooksDefault();
  }, [loadingBooks]);
  return (
    <div className={loadingBooks ? "h-screen" : ""}>
      <h1 className="booksTitle">Book Stats</h1>
      <div className={styles.booksStatsCon}>
        <div className="flex flex-col justify-self-center">
          <h2>Total Scores</h2>
          {fetchedData?.length <= 0 ? (
            <LoaderNoText />
          ) : (
            <>
              <Filters
                type="all"
                sortBooksDefault={sortBooksDefault}
                sortBooksHighest={sortBooksHighest}
                sortBooksLowest={sortBooksLowest}
                sortBooksOther={sortBooksOther}
              />
              <Graph
                bookTitles={fetchedData?.map((book) => book.title)}
                bookScores={fetchedData?.map((book) =>
                  book.totalScore?.toFixed(2)
                )}
                username="Total Scores"
              />
            </>
          )}
        </div>
        <div className="flex flex-col justify-self-center">
          <h2>By Genre</h2>
          {fetchedData?.length <= 0 ? (
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
          {loadingBooks ? (
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
          {loadingBooks ? (
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
      <div className={styles.meetingDateCon}>
        <h2>By Meeting Date</h2>
        <div>
          <ul>
            {yearMatchArray.map((year, i) => (
              <li key={i}>
                {year}: {findYearCount(year, yearArray)} book(s)
              </li>
            ))}
          </ul>
        </div>
        {loadingBooks ? (
          <LoaderNoText />
        ) : (
          <LineGraph
            labelArray={labelArray.slice().reverse()}
            dateArray={dateArray.slice().reverse()}
            scoreArray={totalScoreArray.slice().reverse()}
            xAxes={"Meeting Date"}
          />
        )}
      </div>
    </div>
  );
};

export default BookStats;
