/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import GodWormImage from "@/assets/badges/Badge-allbooks-badge.jpg";
import BadgeTemplate from "../BadgeTemplate";
import Link from "next/link";
import style from "../badges.module.css";

type Props = {
  godWorm: boolean;
};

const GodWorm: React.FC<Props> = ({ godWorm }) => {
  const badge = GodWormImage.src;

  const content = (
    <div className={style.contentCon}>
      <img src={badge} alt="God of Worms" width="250px" />
      <p>At one time have read all of the books</p>
      <Link className="underline" href="/club/badges">
        what's this?
      </Link>
    </div>
  );
  return (
    <>
      {godWorm ? (
        <BadgeTemplate
          title={"God of Worms"}
          content={content}
          badgeImageURL={badge}
        />
      ) : null}
    </>
  );
};

export default GodWorm;
