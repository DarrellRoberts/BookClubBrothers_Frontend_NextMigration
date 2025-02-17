import Filters from "@/components/graphs/brothers/Filters";
import Graph from "@/components/graphs/brothers/Graph";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { averageScore } from "@/utils/stat-functions/scoreFunctions";
import { User } from "@/types/UserInterface";
import React, { useState, useEffect } from "react";

type Props = {
  loadingBooks: boolean;
  loadingUsers: boolean;
  userData: User[];
};

const BrothersScores: React.FC<Props> = ({
  loadingBooks,
  loadingUsers,
  userData,
}) => {
  const [fetchedData, setFetchedData] = useState<User[]>();

  const userGraphData = userData ? [...userData] : [];

  const sortBooksLowest = () => {
    setFetchedData(
      userGraphData?.sort((a, b) => averageScore(a) - averageScore(b))
    );
  };

  const sortBooksHighest = () => {
    setFetchedData(
      userGraphData?.sort((a, b) => averageScore(a) - averageScore(b)).reverse()
    );
  };

  const sortBooksDefault = () => {
    setFetchedData(userGraphData?.sort());
  };

  useEffect(() => {
    sortBooksDefault();
  }, [loadingBooks, loadingUsers]);
  return (
    <>
      {fetchedData?.length <= 0 ? (
        <LoaderNoText />
      ) : (
        <>
          <Filters
            sortBooksDefault={sortBooksDefault}
            sortBooksHighest={sortBooksHighest}
            sortBooksLowest={sortBooksLowest}
            type="normal"
          />
          <Graph
            bookTitles={fetchedData?.map((user) => user.username)}
            bookScores={fetchedData?.map((user) => averageScore(user))}
            username="User"
          />
        </>
      )}
    </>
  );
};

export default BrothersScores;
