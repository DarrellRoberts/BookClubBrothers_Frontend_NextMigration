/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import GodWormImage from "@/assets/badges/Badge-allbooks-badge.jpg";
import BadgeTemplate from "../BadgeTemplate";
import Link from "next/link";

type Props = {
  godWorm: boolean;
};

const GodWorm: React.FC<Props> = ({ godWorm }) => {
  const badge = GodWormImage.src;

  const content = (
    <>
      <p>At one time have read all of the books</p>
      <Link className="underline" href="/club/badges">what's this?</Link>
    </>
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
