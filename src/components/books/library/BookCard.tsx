import UiCard from "@/components/ui/card/UiCard"
import React, { useMemo } from "react"

type Props = {
  title: string
  totalScore: number
  hideScores: boolean
  isSingleBook?: boolean
  imageURL: string
}

const BookCard = ({ title, totalScore, hideScores, imageURL }: Props) => {
  const calcTotalPercentage = useMemo(() => {
    return Math.floor(totalScore * 10)
  }, [totalScore])
  return (
    <UiCard
      bookTitle={title}
      bookCoverImage={imageURL}
      calcTotalPercentage={calcTotalPercentage}
      hideScores={hideScores}
    />
  )
}

export default BookCard
