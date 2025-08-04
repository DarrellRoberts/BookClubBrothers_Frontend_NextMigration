/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */

type Props = {
  title?: string
  imageURL: string
}

const BookImageCover: React.FC<Props> = ({ title, imageURL }) => {
  return (
    <>
      <div className="flex w-full justify-center">
        <h2 className="font-main text-[2rem] font-bolder text-center underline m-0 inline-size-[275px] text-ellipsis whitespace-nowrap overflow-hidden max-md:text-[1.75rem] max-md:no-underline max-md:w-full max-sm:text-2xl max-sm:w-[250px] max-xs:w-[300px]">
          {title ?? ""}
        </h2>
      </div>
      <img
        src={imageURL}
        alt="book_review_image"
        className="m-5 border-[var(--default-border-color)] border-5 border-solid"
      />
    </>
  )
}

export default BookImageCover
