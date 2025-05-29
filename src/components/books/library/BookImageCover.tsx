/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import style from "./BookCover.module.css"

type Props = {
  title?: string
  imageURL: string
}

const BookImageCover: React.FC<Props> = ({ title, imageURL }) => {
  return (
    <>
      <div className="flex justify-center w-full">
        <h2 className={style.smallBookTitle}>{title ?? ""}</h2>
      </div>
      <img
        src={imageURL}
        alt="book_review_image"
        className={style.bookImageCon}
      />
    </>
  )
}

export default BookImageCover
