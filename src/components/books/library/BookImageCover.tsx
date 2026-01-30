import Image from "next/image"
import BookRatingsBox from "./BookRatingsBox"

type Props = {
  title?: string
  imageURL: string
  totalScore: number
  ratingArr: number[] | number
  raterArr: string[]
  hideScores: boolean
  isSingleBook?: boolean
}

const BookImageCover: React.FC<Props> = ({
  title,
  imageURL,
  totalScore,
  ratingArr,
  raterArr,
  hideScores,
  isSingleBook,
}) => {
  return (
    <div
      className={
        isSingleBook
          ? "w-[600px] h-[400px] border-2 border-[var(--default-border-color)] flex justify-center text-center items-center border-solid m-5 max-md:mx-0 max-sm:h-full max-sm:w-full"
          : "flex justify-center items-center text-center border-5 border-solid border-[var(--default-border-color)] h-63 aspect-[1.55/1] max-xs:w-75"
      }
    >
      <div className="w-[45%] max-sm:w-[60%]">
        <Image
          src={imageURL}
          alt={title}
          width={500}
          height={500}
          className={
            isSingleBook ? "w-full h-99 max-sm:h-65" : "h-60 w-50 max-sm:w-fit"
          }
        />
      </div>
      <div className="bg-[var(--main-bg-color)] h-[calc(100%-8px)] flex w-[55%] max-sm:[40%] justify-center">
        <BookRatingsBox
          totalScore={totalScore}
          ratingArr={ratingArr}
          raterArr={raterArr}
          hideScores={hideScores}
        />
      </div>
    </div>
  )
}

export default BookImageCover
