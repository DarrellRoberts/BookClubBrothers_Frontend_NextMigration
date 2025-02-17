import Filters from "@/components/graphs/brothers/Filters";
import Graph from "@/components/graphs/brothers/Graph";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores";
import { Book } from "@/types/BookInterface";
import React, { useEffect, useState } from "react";

type Props = {
  bookData: Book[];
  loadingBooks: boolean;
};

const BookStatsTotalScores: React.FC<Props> = ({ bookData, loadingBooks }) => {
  const [fetchedData, setFetchedData] = useState<Book[]>();

  const readBooks = bookData?.filter(
    (book) =>
      book.read === true && !handleHideScores_NoSetter(book.actualDateOfMeeting)
  );

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
    <>
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
            bookScores={fetchedData?.map((book) => book.totalScore?.toFixed(2))}
            username="Total Scores"
          />
        </>
      )}
    </>
  );
};

export default BookStatsTotalScores;
