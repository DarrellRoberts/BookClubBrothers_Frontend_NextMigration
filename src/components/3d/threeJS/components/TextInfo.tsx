import React from "react"
import Link from "next/link"
import { Button } from "antd"
import { Book } from "@/types/BookInterface"

type Props = {
  readBooksJson: Book[]
  clickId: string
}

export default function TextInfo({ clickId, readBooksJson }: Props) {
  const bookInfo = readBooksJson.find((book) => book._id === clickId)

  return (
    <div className="flex flex-col justify-center items-center absolute top-[55%] right-[10%] font-[var(--main)] max-md:top-[90%] max-md:right-0 max-md:w-full max-md:p-8 max-md:bg-[var(--main-font-color)] max-md:text-[var(--main-bg-color)] max-md:z-[3]">
      <h2 className="text-4xl underline max-md:text-3xl max-md:text-center">
        {bookInfo?.title}
      </h2>
      <h2 className="text-4xl max-md:text-3xl">by {bookInfo?.author}</h2>
      <ul className="list-none">
        <li className="text-xl max-md:text-base">Pages: {bookInfo?.pages}</li>
        <li className="text-xl max-md:text-base">
          Year Published: {bookInfo?.yearPublished}
        </li>
        <li className="text-xl max-md:text-base">
          Score: {bookInfo?.totalScore}
        </li>
      </ul>
      <Link href={`/books/library/${bookInfo._id}`} className="z-[11]">
        <Button>More Info</Button>
      </Link>
    </div>
  )
}
