/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import LoneWolfImage from "@/assets/badges/Badge-lonewolf-badge-image.webp"
import BadgeTemplate from "../BadgeTemplate"
import Link from "next/link"
import { Badge } from "antd"

type Props = {
  loneWolf: number
  isVertical?: boolean
}

const LoneWolf: React.FC<Props> = ({ loneWolf, isVertical }) => {
  const badge = LoneWolfImage.src

  const content = (
    <div className="">
      <img src={badge} alt="Lone Worm" width="250px" />
      <p>Have been the only person to score a book.</p>
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
      {loneWolf ? (
        <Badge color="#005c00" count={loneWolf}>
          <BadgeTemplate
            title={`Lone Worm (x${loneWolf})`}
            content={content}
            badgeImageURL={badge}
            isVertical={isVertical}
          />
        </Badge>
      ) : null}
    </>
  )
}

export default LoneWolf
