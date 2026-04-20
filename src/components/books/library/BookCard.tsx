import UiCard from "@/components/ui/card/UiCard"

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
