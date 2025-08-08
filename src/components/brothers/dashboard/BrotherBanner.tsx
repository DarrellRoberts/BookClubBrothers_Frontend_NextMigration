import BookCover from "@/components/books/library/BookCover"
import BookImageCover from "@/components/books/library/BookImageCover"
import PictureUploadButton from "@/components/forms/brotherform/PictureUploadButton"
import PieChart from "@/components/graphs/brothers/PieChart"
import Badges from "@/components/misc/badges/Badges"
import Profile from "@/components/misc/profile/Profile"
import { formatServerDate } from "@/utils/time-functions/formatServerDate"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import Link from "next/link"
import React from "react"
import { User } from "@/types/UserInterface"
import { Book } from "@/types/BookInterface"
import {
  averageScore,
  filterUserUnreadBooks,
  findMaxScoreBook,
  findMinScoreBook,
  unreadBookTitles,
  userReadBookTitles,
} from "@/utils/stat-functions/scoreFunctions"
import { useAuth } from "@/hooks/auth-hooks/useAuth"
import { Button } from "antd"

type Props = {
  user: User
  readBooks: Book[]
}

const BrotherBanner: React.FC<Props> = ({ user, readBooks }) => {
  const { decodedToken } = useAuth()

  const scoreArray = user?.userInfo?.books?.score
  const findMinBook: Book = findMinScoreBook(readBooks, scoreArray, user)
  const findMaxBook: Book = findMaxScoreBook(readBooks, scoreArray, user)
  const avgScore: string = averageScore(user)?.toFixed(2)

  const userUnreadBooks: Book[] = filterUserUnreadBooks(readBooks, user?._id)
  const unreadBooksArr: string[] = unreadBookTitles(readBooks, user?._id)
  const readBooksArr: string[] = userReadBookTitles(readBooks, user?._id)
  const noUserReadBooks: number = user?.userInfo?.books?.score?.length

  return (
    <>
      <div className="flex flex-col min-md:flex-row items-start max-md:items-center justify-between mt-4 max-md:space-y-4">
        <div className="flex flex-col max-md:items-center">
          <h1 className="text-9xl m-5 max-xs:text-7xl">{user?.username}</h1>
          <span className="font-main ml-0 md:ml-12 text-lg max-md:text-center">
            Last login: {formatServerDate(user?.lastLoggedIn) ?? ""}
          </span>
        </div>

        <div className="flex flex-col items-center max-md:mb-4 max-md:mr-0">
          <h2 className="font-main text-4xl max-sm:text-3xl underline text-center mb-2">
            Achievements
          </h2>
          <Badges badgeData={user?.userInfo?.badges} />
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center mr-0 md:mr-8 max-md:mr-0">
          <div className="flex flex-col items-center">
            <Profile imageURL={user?.userInfo?.profileURL} />
            {decodedToken?._id === user?._id ? (
              <div className="flex justify-center mt-2">
                <PictureUploadButton
                  id={user?._id}
                  inImage={user?.userInfo?.profileURL}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 overflow-hidden max-md:flex max-md:flex-col max-md:items-center my-6">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Worst book</h2>
          <div className="w-96 max-sm:w-75 max-xs:w-70">
            <Link href={`/books/library/${findMinBook?._id}`}>
              {findMinBook?.reviewImageURL ? (
                <BookImageCover imageURL={findMinBook?.reviewImageURL} />
              ) : (
                <BookCover
                  title={findMinBook?.title}
                  totalScore={findMinBook?.totalScore}
                  ratingArr={findMinBook?.scoreRatings?.rating}
                  raterArr={findMinBook?.scoreRatings?.raterId}
                  hideScores={handleHideScores_NoSetter(
                    findMinBook?.actualDateOfMeeting
                  )}
                />
              )}
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Best book</h2>
          <div className="w-96 max-sm:w-75 max-xs:w-70">
            <Link href={`/books/library/${findMaxBook?._id}`}>
              {findMaxBook?.reviewImageURL ? (
                <BookImageCover imageURL={findMaxBook?.reviewImageURL} />
              ) : (
                <BookCover
                  title={findMaxBook?.title}
                  totalScore={findMaxBook?.totalScore}
                  ratingArr={findMaxBook?.scoreRatings?.rating}
                  raterArr={findMaxBook?.scoreRatings?.raterId}
                  hideScores={handleHideScores_NoSetter(
                    findMaxBook?.actualDateOfMeeting
                  )}
                />
              )}
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Books read</h2>
          <div className="flex justify-center h-full">
            <PieChart
              userReadBooks={readBooksArr}
              unreadBooks={unreadBooksArr}
              booksRead={[noUserReadBooks, userUnreadBooks?.length]}
              bookTotal={readBooks?.length}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Average Score</h2>
          <Link href="/brothers/stats">
            <div className="border-4 border-[var(--main-font-color)] border-dotted h-80 w-80  max-w-sm max-sm:w-80 max-sm:h-64 flex items-center justify-center rounded-full">
              <h2 className="text-6xl md:text-8xl font-main text-center p-4">
                {avgScore}
              </h2>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex justify-evenly w-full">
        <Button href="/books" color="primary" size="large">
          Books
        </Button>
        <Button href="/brothers" color="default" size="large">
          Brothers
        </Button>
      </div>
    </>
  )
}

export default BrotherBanner
