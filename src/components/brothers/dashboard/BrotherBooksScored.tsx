import Filters from "@/components/graphs/brothers/Filters";
import Graph from "@/components/graphs/brothers/Graph";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { filterUserReadBooks } from "@/functions/stat-functions/scoreFunctions";
import { handleHideScores_NoSetter } from "@/functions/time-functions/hideScores";
import { Book } from "@/types/BookInterface";
import { User } from "@/types/UserInterface";
import React, { useEffect, useState } from "react";

type Props = {
  user: User;
  loadingBooks: boolean;
  loadingUsers: boolean;
  readBooks: Book[];
};

const BrotherBooksScored: React.FC<Props> = ({
  user,
  loadingBooks,
  loadingUsers,
  readBooks,
}) => {
  const [fetchedData, setFetchedData] = useState<Book[]>();

  const userReadBooks: Book[] = filterUserReadBooks(
    readBooks,
    user?._id
  )?.filter((book) => !handleHideScores_NoSetter(book.actualDateOfMeeting));

  const sortBooksDefault = () => {
    setFetchedData(
      userReadBooks?.sort(
        (a, b) =>
          new Date(b.dateOfMeeting).getTime() -
          new Date(a.dateOfMeeting).getTime()
      )
    );
  };

  const sortBooksLowest = () => {
    setFetchedData(
      userReadBooks?.sort(
        (a, b) =>
          a.scoreRatings.rating[a.scoreRatings.raterId.indexOf(user?._id)] -
          b.scoreRatings.rating[b.scoreRatings.raterId.indexOf(user?._id)]
      )
    );
  };

  const sortBooksHighest = () => {
    setFetchedData(
      userReadBooks
        ?.sort(
          (a, b) =>
            a.scoreRatings.rating[a.scoreRatings.raterId.indexOf(user?._id)] -
            b.scoreRatings.rating[b.scoreRatings.raterId.indexOf(user?._id)]
        )
        .reverse()
    );
  };

  const sortBooksOther = () => {
    setFetchedData(
      userReadBooks?.sort(
        (a, b) =>
          new Date(a.dateOfMeeting).getTime() -
          new Date(b.dateOfMeeting).getTime()
      )
    );
  };

  useEffect(() => {
    sortBooksDefault();
  }, [loadingBooks, loadingUsers]);
  return (
    <>
      {fetchedData?.length === 0 ? (
        <LoaderNoText />
      ) : (
        <>
          <Filters
            sortBooksDefault={sortBooksDefault}
            sortBooksHighest={sortBooksHighest}
            sortBooksLowest={sortBooksLowest}
            sortBooksOther={sortBooksOther}
            type="all"
          />
          <Graph
            bookTitles={fetchedData?.map((book) => book.title)}
            totalBookScores={fetchedData?.map((book) => book.totalScore)}
            bookScores={fetchedData?.map(
              (book) =>
                book?.scoreRatings?.rating[
                  book?.scoreRatings?.raterId.indexOf(user?._id)
                ]
            )}
            username={user?.username}
          />
        </>
      )}
    </>
  );
};

export default BrotherBooksScored;
