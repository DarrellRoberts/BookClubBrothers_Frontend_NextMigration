/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import GodWormImage from "@/assets/badges/Badge-allbooks-badge.webp"
import BadgeTemplate from "../BadgeTemplate"
import Link from "next/link"

type Props = {
  godWorm: boolean
  isVertical: boolean
}

const GodWorm: React.FC<Props> = ({ godWorm, isVertical }) => {
  const badge = GodWormImage.src

  const content = (
    <div className="">
      <img src={badge} alt="God of Worms" width="250px" />
      <p>At one time have read all of the books</p>
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
      {godWorm ? (
        <BadgeTemplate
          title={"God of Worms"}
          content={content}
          badgeImageURL={badge}
          isVertical={isVertical}
        />
      ) : null}
    </>
  )
}

export default GodWorm
