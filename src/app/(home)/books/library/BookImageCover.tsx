/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import style from "./BookCover.module.css";

type Props = {
  title?: string,
  imageURL: string
}

const BookImageCover: React.FC<Props> = ({title, imageURL })=> {
  return (
    <>
      <h2 className={style.smallBookTitle}>{title ?? ""}</h2>
      <img
        src={imageURL}
        alt="book_review_image"
        className="border-black border-4 border-black border-solid m-5"
      />
    </>
  );
};

export default BookImageCover;