import BrotherLoadingBooksScored from "@/components/brothers/dashboard/BrotherLoadingBooksScored"
import ScatterGraph from "@/components/graphs/brothers/ScatterGraph"
import LoaderNoText from "@/components/loader/LoaderNoText"
import { Book } from "@/types/BookInterface"
import React from "react"

type Props = {
  readBooks: Book[]
  loadingBooks: boolean
}

const BookStatsYrPublished: React.FC<Props> = ({ readBooks, loadingBooks }) => {
  const totalScoreArray = readBooks?.map((book) => book.totalScore?.toFixed(2))
  const labelArray = readBooks?.map((book) => book.title)
  const yearPublishedArray = readBooks?.map((book) => book.yearPublished)

  return (
    <>
      {loadingBooks ? (
        <BrotherLoadingBooksScored />
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
    </>
  )
}

export default BookStatsYrPublished
