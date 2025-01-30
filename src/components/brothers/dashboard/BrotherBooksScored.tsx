import Filters from "@/components/graphs/brothers/Filters";
import Graph from "@/components/graphs/brothers/Graph";
import { Book } from "@/types/BookInterface";
import { User } from "@/types/UserInterface";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  user: User;
  fetchedData: Book[];
  userReadBooks: Book[];
  setFetchedData: Dispatch<SetStateAction<Book[]>>;
  sortBooksDefault: () => void;
};

const BrotherBooksScored: React.FC<Props> = ({
  user,
  fetchedData,
  userReadBooks,
  setFetchedData,
  sortBooksDefault,
}) => {
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
  return (
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
  );
};

export default BrotherBooksScored;
