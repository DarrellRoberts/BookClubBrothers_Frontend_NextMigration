/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import LoneWolfImage from "@/assets/badges/Badge-lonewolf-badge-image.jpg";
import BadgeTemplate from "../BadgeTemplate";

type Props = {
  loneWolf: boolean;
};

const BookWorm: React.FC<Props> = ({ loneWolf }) => {
  const badge = LoneWolfImage.src;

  const content = (
    <>
      <p>Have been the only person to score a book</p>
      <a className="underline" href="/club/badges">what's this?</a>
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
