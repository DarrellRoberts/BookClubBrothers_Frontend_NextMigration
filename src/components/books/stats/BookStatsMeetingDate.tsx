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
    dateFormatter(book.actualDateOfMeeting),
  )

  const pagesPerYear = useMemo(() => {
    if (!readBooks?.length) return []

    const pageMap = new Map<string, { totalPages: number; count: number }>()

    readBooks.forEach((book) => {
      if (!book.actualDateOfMeeting) return

      const year = new Date(book.actualDateOfMeeting).getFullYear().toString()
      const current = pageMap.get(year) || { totalPages: 0, count: 0 }

      pageMap.set(year, {
        totalPages: current.totalPages + (book.pages || 0),
        count: current.count + 1,
      })
    })

    // Convert to array and sort by year descending
    return Array.from(pageMap.entries()).sort((a, b) =>
      a[0].localeCompare(b[0]),
    )
  }, [readBooks])

  const totalScoreArray = readBooks?.map((book) => book.totalScore?.toFixed(2))
  const labelArray = readBooks?.map((book) => book.title)
  return loadingBooks ? (
    <BrotherLoadingBooksScored />
  ) : (
    <>
      <div className="flex w-full justify-center">
        <ul>
          {pagesPerYear.map(([year, stats]) => (
            <li key={year}>
              {year}: {stats.count} book(s), {stats.totalPages} pages
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
