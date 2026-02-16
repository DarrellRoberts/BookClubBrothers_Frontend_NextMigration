import UiCard from "@/components/ui/card/UiCard"
import React, { useMemo } from "react"

type Props = {
  title: string
  totalScore: number
  hideScores: boolean
  imageURL: string
  isSingleBook?: boolean
}

const BookCard = ({ title, totalScore, hideScores, imageURL, isSingleBook }: Props) => {
  const calcTotalPercentage = useMemo(() => {
    return Math.floor(totalScore * 10)
  }, [totalScore])
  return (
    <UiCard
      bookTitle={title}
      bookCoverImage={imageURL}
      calcTotalPercentage={calcTotalPercentage}
      hideScores={hideScores}
      isSingleBook={isSingleBook}
    />
  )
}

export default BookCard
