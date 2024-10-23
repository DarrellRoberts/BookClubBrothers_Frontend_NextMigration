/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import BookWormImage from "@/assets/badges/Badge-monkworm-image.jpg";
import BadgeTemplate from "../BadgeTemplate";
import Link from "next/link";

type Props = {
  firstBookWorm: boolean;
};

const FirstBook: React.FC<Props> = ({ firstBookWorm }) => {
  const badge = BookWormImage.src;

  const content = (
    <>
      <p>Have rated their first book</p>
      <Link className="underline" href="/club/badges">what's this?</Link>
    </>
  );
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
  );
};

export default FirstBook;
