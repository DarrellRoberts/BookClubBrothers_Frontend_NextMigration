import Graph from "@/components/graphs/brothers/Graph"
import LoaderNoText from "@/components/loader/LoaderNoText"
import { genreAverageScore } from "@/utils/stat-functions/scoreFunctions"
import { Book } from "@/types/BookInterface"
import React from "react"
import BrotherLoadingBooksScored from "@/components/brothers/dashboard/BrotherLoadingBooksScored"

type Props = {
  readBooks: Book[]
  loadingBooks: boolean
}

const BookStatsGenre: React.FC<Props> = ({ readBooks, loadingBooks }) => {
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
  ]
  const genreAvgScoreArray =
    genreArray.map((genre) => genreAverageScore(readBooks, genre)) ?? []
  return (
    <>
      {loadingBooks ? (
        <BrotherLoadingBooksScored />
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
  )
}

export default BookStatsGenre
