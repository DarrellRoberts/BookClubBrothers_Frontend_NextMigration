import BookWormImage from "@/assets/badges/Badge-monkworm-image.webp"
import BadgeTemplate from "../BadgeTemplate"
import Link from "next/link"

type Props = {
  firstBookWorm: boolean
  isVertical?: boolean
}

const FirstBook: React.FC<Props> = ({ firstBookWorm, isVertical }) => {
  const badge = BookWormImage.src

  const content = (
    <div className="">
      <img src={badge} alt="Brother Worm" width="250px" />
      <p>Have rated their first book</p>
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
      {firstBookWorm ? (
        <BadgeTemplate
          title={"Brother Worm"}
          content={content}
          badgeImageURL={badge}
          isVertical={isVertical}
        />
      ) : null}
    </>
  )
}

export default FirstBook
