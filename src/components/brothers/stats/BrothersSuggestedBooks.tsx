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

const BrothersSuggestedBooks: React.FC<Props> = ({ userData, bookData }) => {
  const suggestedObj = {}
  const createSuggestedMap = () => {
    const usernameArr =
      bookData?.map((book) => findUser(book?.suggestedBy, userData)) ?? []
    if (usernameArr?.length === 0) return {}
    for (const username of usernameArr) {
      if (!suggestedObj[username]) {
        suggestedObj[username] = 1
      } else if (suggestedObj[username]) {
        suggestedObj[username] = suggestedObj[username] + 1
      }
    }
    return suggestedObj
  }
  createSuggestedMap()

  return (
    <>
      {userData?.length <= 0 ? (
        <LoaderNoText />
      ) : (
        <>
          <Graph
            bookTitles={Object.keys(suggestedObj)}
            bookScores={Object.values(suggestedObj)}
            username="User"
            isSuggested={true}
          />
        </>
      )}
    </>
  )
}

export default BrothersSuggestedBooks
