/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Image from "next/image"

type Props = {
  title?: string
  imageURL: string
}

const BookImageCover: React.FC<Props> = ({ title, imageURL }) => {
  return (
    <>
      <Image
        src={imageURL}
        alt={title}
        className="border-[var(--default-border-color)] border-5 border-solid h-63 aspect-[1.55/1] max-xs:w-75 max-xs:aspect-auto max-xs:h-63"
        width={252 * 1.55}
        height={252}
      />
    </>
  )
}

export default BookImageCover
