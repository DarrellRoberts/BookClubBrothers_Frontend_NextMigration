import Graph from "@/components/graphs/brothers/Graph"
import { genreAverageScore } from "@/utils/stat-functions/scoreFunctions"
import { Book } from "@/types/BookInterface"
import React from "react"
import BrotherLoadingBooksScored from "@/components/brothers/dashboard/BrotherLoadingBooksScored"
import { genres } from "@/configs/genre"

type Props = {
  readBooks: Book[]
  loadingBooks: boolean
}

const BookStatsGenre: React.FC<Props> = ({ readBooks, loadingBooks }) => {
  const genresLabels = genres.map((genre) => genre.value)

  const genreAvgScoreArray =
    genresLabels.map((genre) => genreAverageScore(readBooks, genre)) ?? []
  return (
    <>
      {loadingBooks ? (
        <BrotherLoadingBooksScored />
      ) : (
        <>
          <Graph
            bookTitles={genresLabels}
            bookScores={genreAvgScoreArray}
            username="Genre"
          />
        </>
      )}
    </>
  )
}

export default BookStatsGenre
