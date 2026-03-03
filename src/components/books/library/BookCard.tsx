import UiCard from "@/components/ui/card/UiCard"
import React, { useMemo } from "react"

type Props = {
  title: string
  totalScore: number
  hideScores: boolean
  imageURL: string
  isSingleBook?: boolean
}

const BookCard = ({
  title,
  totalScore,
  hideScores,
  imageURL,
  isSingleBook,
}: Props) => {
  return (
    <UiCard
      bookTitle={title}
      bookCoverImage={imageURL}
      totalScore={totalScore}
      hideScores={hideScores}
      isSingleBook={isSingleBook}
    />
  )
}

export default BookCard
