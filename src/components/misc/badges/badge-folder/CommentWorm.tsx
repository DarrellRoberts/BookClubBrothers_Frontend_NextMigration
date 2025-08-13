/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import CommentWormImage from "@/assets/badges/Badge-comment.badge-image.webp"
import BadgeTemplate from "../BadgeTemplate"
import Link from "next/link"

type Props = {
  commentWorm: boolean
  isVertical: boolean
}

const BookWorm: React.FC<Props> = ({ commentWorm, isVertical }) => {
  const badge = CommentWormImage.src
  const content = (
    <div className="">
      <img src={badge} alt="Comment Worm" width="250px" />
      <p>Have commented on five or more books</p>
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
      {commentWorm ? (
        <BadgeTemplate
          title={"Comment Worm"}
          content={content}
          badgeImageURL={badge}
          isVertical={isVertical}
        />
      ) : null}
    </>
  )
}

export default BookWorm
