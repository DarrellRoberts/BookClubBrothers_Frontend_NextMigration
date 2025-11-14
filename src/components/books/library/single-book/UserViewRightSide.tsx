import { Book } from "@/types/BookInterface"
import React from "react"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import { dateFormatter } from "@/utils/time-functions/dateFormatter"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"

type Props = {
  bookData: Book
}

const UserViewRightSide: React.FC<Props> = ({ bookData }) => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <ul>
      <li className="mt-5 underline">Author</li>
      {bookData ? (
        <li>{bookData?.author}</li>
      ) : (
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      )}
      <li className="mt-5 underline">Published in</li>
      {bookData ? (
        <li className="">
          {bookData?.yearPublished < 0
            ? Math.abs(bookData?.yearPublished) + " BCE"
            : bookData?.yearPublished}
        </li>
      ) : (
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      )}
      <li className="mt-5 underline">Number of pages</li>
      {bookData ? (
        <li>{bookData?.pages}</li>
      ) : (
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      )}

      <li className="mt-5 underline">Genres</li>
      {bookData ? (
        bookData?.genre?.map((type, i) => (
          <li key={i}>
            {type[bookData?.genre?.length - 1] ? ` ${type}` : ` ${type},`}
          </li>
        ))
      ) : (
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      )}

      <li className="mt-5 underline">Planned Meeting Date</li>
      {bookData ? (
        <li className="">
          {bookData?.dateOfMeeting
            ? dateFormatter(bookData?.dateOfMeeting)
            : "???"}
        </li>
      ) : (
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      )}

      <li className="mt-5 underline">Actual Meeting Date</li>
      {bookData ? (
        <li className="">
          {bookData?.actualDateOfMeeting
            ? dateFormatter(bookData?.actualDateOfMeeting)
            : "???"}
        </li>
      ) : (
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      )}

      <li className="mt-5 underline">Score</li>
      {bookData ? (
        <li className="">
          {handleHideScores_NoSetter(bookData?.actualDateOfMeeting)
            ? "?"
            : bookData?.totalScore}
        </li>
      ) : (
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      )}
      <br />
      {bookData?.shortStories?.length > 0 &&
        bookData?.shortStories?.map((story) => (
          <li key={story._id} className="">
            {story.title}:
            <span>
              {handleHideScores_NoSetter(bookData?.actualDateOfMeeting)
                ? " ?"
                : " " +
                  story.scoreRatings.rating.reduce((acc, sum) => acc + sum) /
                    story.scoreRatings.rating.length}
            </span>
          </li>
        ))}
    </ul>
  )
}

export default UserViewRightSide
