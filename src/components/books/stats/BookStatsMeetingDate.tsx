import LineGraph from "@/components/graphs/brothers/LineGraph"
import { dateFormatter } from "@/utils/time-functions/dateFormatter"
import { Book } from "@/types/BookInterface"
import React, { useMemo } from "react"
import BrotherLoadingBooksScored from "@/components/brothers/dashboard/BrotherLoadingBooksScored"

type Props = {
  readBooks: Book[]
  loadingBooks: boolean
}

const BookStatsMeetingDate: React.FC<Props> = ({ readBooks, loadingBooks }) => {
  const dateArray: string[] = readBooks?.map((book) =>
    dateFormatter(book.actualDateOfMeeting)
  )

  const pagesPerYear = useMemo(() => {
    const yearArray: string[] | number[] = dateArray
      ?.map((date) => date.split(" ")[3])
      .reverse()
    const pagesDateArray = readBooks?.map((book) => ({
      year: dateFormatter(book.actualDateOfMeeting).split(" ")[3],
      totalPages: book.pages,
      numberBooks: yearArray.filter(
        (yr) => yr === dateFormatter(book.actualDateOfMeeting).split(" ")[3]
      ).length,
    }))
    const pageMap = new Map()
    if (pagesDateArray?.length > 0) {
      for (const date of pagesDateArray) {
        if (!pageMap.has(date.year)) {
          pageMap.set(date.year, [
            pagesDateArray
              .filter((item) => item.year === date.year)
              .reduce((prev, current) => prev + current.totalPages, 0),
            date.numberBooks,
          ])
        }
      }
    }
    return Array.from(pageMap.entries()).reverse()
  }, [readBooks])

  const totalScoreArray = readBooks?.map((book) => book.totalScore?.toFixed(2))
  const labelArray = readBooks?.map((book) => book.title)
  return loadingBooks ? (
    <BrotherLoadingBooksScored />
  ) : (
    <>
      <div className="flex w-full justify-center">
        <ul>
          {pagesPerYear?.map((year, i) => (
            <li key={`${year}${i}`}>
              {year[0]}: {year[1][1]} book(s), {year[1][0]} pages
            </li>
          ))}
        </ul>
      </div>
      <LineGraph
        labelArray={labelArray.slice().reverse()}
        dateArray={dateArray.slice().reverse()}
        scoreArray={totalScoreArray.slice().reverse()}
        xAxes={"Meeting Date"}
      />
    </>
  )
}

export default BookStatsMeetingDate
