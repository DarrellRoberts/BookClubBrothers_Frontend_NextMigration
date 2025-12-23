import Graph from "@/components/graphs/brothers/Graph"
import LoaderNoText from "@/components/loader/LoaderNoText"
import { User } from "@/types/UserInterface"
import React from "react"
import { Book } from "@/types/BookInterface"
import { findUser } from "@/utils/find-functions/find"

type Props = {
  userData: User[]
  bookData: Book[]
}

type UserTitles = {
  titles: string[]
  score: number[]
}

const BrothersSuggestedBooks: React.FC<Props> = ({ userData, bookData }) => {
  const suggestedTitlesObject = {}
  const createSuggestedTitlesMap = () => {
    if (!bookData) return {}
    if (bookData?.length === 0) return {}
    if (userData?.length === 0) return {}
    for (const user of bookData) {
      const username = findUser(user.suggestedBy, userData)
      if (!suggestedTitlesObject[username]) {
        suggestedTitlesObject[username] = {}
      }
      suggestedTitlesObject[username]["titles"] = bookData
        ?.filter((book) => book.suggestedBy === user.suggestedBy)
        ?.map((book) => book.title)
      suggestedTitlesObject[username]["score"] = bookData
        ?.filter((book) => book.suggestedBy === user.suggestedBy)
        ?.map((book) => book.totalScore)
    }
    return suggestedTitlesObject
  }
  createSuggestedTitlesMap()
  return (
    <>
      {bookData?.length === 0 ? (
        <LoaderNoText />
      ) : (
        <>
          <Graph
            bookTitles={Object.keys(suggestedTitlesObject)}
            bookScores={Object.entries(suggestedTitlesObject)?.map(
              (user: [string, UserTitles]) => user[1].titles.length
            )}
            username="User"
            isSuggested={true}
            tooltipData={Object.entries(suggestedTitlesObject)}
          />
        </>
      )}
    </>
  )
}

export default BrothersSuggestedBooks
