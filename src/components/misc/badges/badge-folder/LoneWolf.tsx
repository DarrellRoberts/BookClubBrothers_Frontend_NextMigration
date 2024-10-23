/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import LoneWolfImage from "@/assets/badges/Badge-lonewolf-badge-image.jpg";
import BadgeTemplate from "../BadgeTemplate";
import Link from "next/link";

type Props = {
  loneWolf: boolean;
};

const BookWorm: React.FC<Props> = ({ loneWolf }) => {
  const badge = LoneWolfImage.src;

  const content = (
    <>
      <p>Have been the only person to score a book</p>
      <Link className="underline" href="/club/badges">what's this?</Link>
    </>
  );
  return (
    <>
      {loneWolf ? (
        <BadgeTemplate
          title={"Lone Worm"}
          content={content}
          badgeImageURL={badge}
        />
      ) : null}
    </>
  );
};

export default BookWorm;
