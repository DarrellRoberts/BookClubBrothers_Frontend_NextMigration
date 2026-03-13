"use client"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import BookStatsTotalScores from "@/components/books/stats/BookStatsTotalScores"
import BookStatsGenre from "@/components/books/stats/BookStatsGenre"
import BookStatsPages from "@/components/books/stats/BookStatsPages"
import BookStatsYrPublished from "@/components/books/stats/BookStatsYrPublished"
import BookStatsMeetingDate from "@/components/books/stats/BookStatsMeetingDate"
import { API_BOOKS } from "@/configs/config"
import { useGetQuery } from "@/hooks/fetch-hooks/useGetQuery"
import { Book } from "@/types/BookInterface"

const BookStats = () => {
  const { data: bookData, isLoading } = useGetQuery<Book[]>({
    queryKey: ["books"],
    apiPath: API_BOOKS,
  })

  const readBooks = bookData?.length
    ? bookData?.filter(
        (book) =>
          book.read === true &&
          !handleHideScores_NoSetter(book.actualDateOfMeeting),
      )
    : []

  return (
    <div>
      <h1 className="font-main text-[5rem] ml-12 max-md:text-[3.5rem] max-md:m-0 max-md:pt-0 max-md:text-center">
        Book Stats
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(600px,1fr))] max-sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
        <div className="flex flex-col justify-self-center">
          <h2 className="font-main text-[2.5rem] underline my-8 ml-12 text-left max-sm:text-center max-sm:my-8 max-sm:ml-0">
            Total Scores
          </h2>
          <BookStatsTotalScores bookData={bookData} loadingBooks={isLoading} />
        </div>

        <div className="flex flex-col justify-self-center">
          <h2 className="font-main text-[2.5rem] underline my-8 ml-12 text-left max-sm:text-center max-sm:my-8 max-sm:ml-0">
            By Genre
          </h2>
          <BookStatsGenre readBooks={readBooks} loadingBooks={isLoading} />
        </div>

        <div className="flex flex-col justify-self-center">
          <h2 className="font-main text-[2.5rem] underline my-8 ml-12 text-left max-sm:text-center max-sm:my-8 max-sm:ml-0">
            By Number of Pages
          </h2>
          <BookStatsPages readBooks={readBooks} loadingBooks={isLoading} />
        </div>

        <div className="flex flex-col justify-self-center">
          <h2 className="font-main text-[2.5rem] underline my-8 ml-12 text-left max-sm:text-center max-sm:my-8 max-sm:ml-0">
            By Year Published
          </h2>
          <BookStatsYrPublished
            readBooks={readBooks}
            loadingBooks={isLoading}
          />
        </div>
      </div>

      <div className="mx-8">
        <h2 className="font-main text-[2.5rem] underline my-8 ml-12 text-left max-sm:text-center max-sm:my-8 max-sm:ml-0">
          By Meeting Date
        </h2>
        <BookStatsMeetingDate readBooks={readBooks} loadingBooks={isLoading} />
      </div>
    </div>
  )
}

export default BookStats
