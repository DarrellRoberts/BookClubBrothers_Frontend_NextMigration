import Graph from "@/components/graphs/brothers/Graph";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { genreAverageScore } from "@/functions/stat-functions/scoreFunctions";
import { Book } from "@/types/BookInterface";
import React from "react";

type Props = {
  readBooks: Book[];
};

const BookStatsGenre: React.FC<Props> = ({ readBooks }) => {
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
  return (
    <>
      {genreAvgScoreArray?.length <= 0 ? (
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
    </>
  );
};

export default BookStatsGenre;
