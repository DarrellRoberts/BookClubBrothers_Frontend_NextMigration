/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import BookWormImage from "@/assets/badges/Badge.worm-badge-image.webp"
import BadgeTemplate from "../BadgeTemplate"
import Link from "next/link"

type Props = {
  bookWorm: boolean
  isVertical?: boolean
}

const BookWorm: React.FC<Props> = ({ bookWorm, isVertical }) => {
  const badge = BookWormImage.src

  const content = (
    <div className="">
      <img src={badge} alt="Book Worm" width="250px" />
      <p>Read the most books at one time</p>
      <Link
        style={{ color: "white", textDecoration: "underline" }}
        href="/club/badges"
      >
        what's this?
      </Link>
    </div>
  )

  return (
    <>
      {bookWorm ? (
        <BadgeTemplate
          title={"Book Worm"}
          content={content}
          badgeImageURL={badge}
          isVertical={isVertical}
        />
      ) : null}
    </>
  )
}

export default BookWorm
