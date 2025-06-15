import { Book } from "@/types/BookInterface"
import React from "react"
import "@/style/singlebook.css"
import "@/style/singlebookRes.css"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import { dateFormatter } from "@/utils/time-functions/dateFormatter"

type Props = {
  bookData: Book
}

const UserViewRightSide: React.FC<Props> = ({ bookData }) => {
  return (
    <>
      <ul>
        <li className="mt-5 underline">Author</li>
        <li className="">{bookData?.author}</li>

        <li className="mt-5 underline">Published in</li>
        <li className="">
          {bookData?.yearPublished < 0
            ? Math.abs(bookData?.yearPublished) + " BCE"
            : bookData?.yearPublished}
        </li>
        <li className="mt-5 underline">Number of pages</li>
        <li className="">{bookData?.pages}</li>

        <li className="mt-5 underline">Genres</li>
        {bookData?.genre?.map((type, i) => (
          <li key={i}>
            {type[bookData?.genre?.length - 1] ? ` ${type}` : ` ${type},`}
          </li>
        ))}

        <li className="mt-5 underline">Planned Meeting Date</li>
        <li className="">
          {bookData?.dateOfMeeting
            ? dateFormatter(bookData?.dateOfMeeting)
            : "???"}
        </li>

        <li className="mt-5 underline">Actual Meeting Date</li>
        <li className="">
          {bookData?.actualDateOfMeeting
            ? dateFormatter(bookData?.actualDateOfMeeting)
            : "???"}
        </li>

        <li className="mt-5 underline">Score</li>
        <li className="">
          {handleHideScores_NoSetter(bookData?.actualDateOfMeeting)
            ? "?"
            : bookData?.totalScore}
        </li>
        <br />
        {bookData.shortStories?.length > 0 &&
          bookData.shortStories?.map((story) => (
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
    </>
  )
}

export default UserViewRightSide
