/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import LoneWolfImage from "@/assets/badges/Badge-lonewolf-badge-image.jpg";
import BadgeTemplate from "../BadgeTemplate";
import Link from "next/link";
import { Badge } from "antd";
import style from "../badges.module.css";

type Props = {
  loneWolf: number;
};

const LoneWolf: React.FC<Props> = ({ loneWolf }) => {
  const badge = LoneWolfImage.src;

  const content = (
    <div className={style.contentCon}>
      <img src={badge} alt="Lone Worm" width="250px" />
      <p>Have been the only person to score a book.</p>
      <Link className="underline" href="/club/badges">
        what's this?
      </Link>
    </div>
  );
  return (
    <>
      {loneWolf ? (
        <Badge color="#005c00" count={loneWolf}>
          <BadgeTemplate
            title={`Lone Worm (x${loneWolf})`}
            content={content}
            badgeImageURL={badge}
          />
        </Badge>
      ) : null}
    </>
  );
};

export default LoneWolf;
