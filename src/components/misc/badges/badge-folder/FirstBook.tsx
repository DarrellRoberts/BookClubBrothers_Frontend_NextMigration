/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import BookWormImage from "@/assets/badges/Badge-monkworm-image.png"
import BadgeTemplate from "../BadgeTemplate"
import Link from "next/link"
import style from "../badges.module.css"

type Props = {
  firstBookWorm: boolean
}

const FirstBook: React.FC<Props> = ({ firstBookWorm }) => {
  const badge = BookWormImage.src

  const content = (
    <div className={style.contentCon}>
      <img src={badge} alt="Brother Worm" width="250px" />
      <p>Have rated their first book</p>
      <Link className="underline" href="/club/badges">
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
        />
      ) : null}
    </>
  )
}

export default FirstBook
