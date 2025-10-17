import BrotherLoadingBooksScored from "@/components/brothers/dashboard/BrotherLoadingBooksScored"
import ScatterGraph from "@/components/graphs/brothers/ScatterGraph"
import { Book } from "@/types/BookInterface"
import React from "react"

type Props = {
  readBooks: Book[]
  loadingBooks: boolean
}

const BookStatsPages: React.FC<Props> = ({ readBooks, loadingBooks }) => {
  const pageNumberArray = readBooks?.map((book) => book.pages)
  const totalScoreArray = readBooks?.map((book) => book.totalScore?.toFixed(2))
  const labelArray = readBooks?.map((book) => book.title)

  return (
    <>
      {loadingBooks ? (
        <BrotherLoadingBooksScored />
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
    </>
  )
}

export default BookStatsPages
