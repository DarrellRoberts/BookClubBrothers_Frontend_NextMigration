/* eslint-disable react/no-unescaped-entities */
import React from "react"
import Link from "next/link"
import { Book } from "@/types/BookInterface"
import { filterUserReadBooks } from "@/utils/stat-functions/scoreFunctions"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"

type Props = {
  username: string
  userId: string
  readBooks: Book[]
}

const CommentCon: React.FC<Props> = ({ username, userId, readBooks }) => {
  const userReadBooks: Book[] = filterUserReadBooks(readBooks, userId)?.filter(
    (book) => !handleHideScores_NoSetter(book.actualDateOfMeeting)
  )
  const filterComments = userReadBooks?.filter((book) =>
    book.commentInfo.commentId.includes(userId)
  )

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filterComments?.length > 0 ? (
        filterComments.map((book, i) => (
          <div className="flex flex-col p-4 rounded-lg">
            <div className="flex justify-center">
              <h3 className="text-3xl sm:text-1.75xl font-bold text-center underline overflow-hidden whitespace-nowrap text-ellipsis max-w-[275px] mb-2">
                {book.title}
              </h3>
            </div>
            <div className="flex justify-center mt-4">
              <Link key={i} href={`/books/library/${book._id}`}>
                <p className="flex items-center justify-center p-6 text-white bg-black rounded-xl text-lg text-center w-full overflow-hidden text-ellipsis h-full hover:pb-10 hover:mb-0 transition-discrete transition-all hover:shadow-black hover:shadow-md">
                  "
                  {
                    book?.commentInfo.comments[
                      book?.commentInfo?.commentId?.indexOf(userId)
                    ]
                  }
                  "
                </p>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center p-8 ">
          <h3 className="text-2xl font-extrabold text-center">
            {username} has written no comments. <br />
            {username}, if you're reading this,{" "}
            <Link
              href="/books/library"
              className="text-bc-green hover:underline"
            >
              click here to access the book library
            </Link>{" "}
            and get writing!
          </h3>
        </div>
      )}
    </div>
  )
}

export default CommentCon
