/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import BookWormImage from "@/assets/badges/Badge-monkworm-image.jpg";
import BadgeTemplate from "./BadgeTemplate";

type Props = {
  firstBookWorm: boolean
};

const FirstBook: React.FC<Props> = ({ firstBookWorm }) => {
  const badge = BookWormImage.src;

  return (
    <>
      {firstBookWorm ? (
        <BadgeTemplate
          title={"Welcome to The Book Club Brothers"}
          content={"Rated their first book"}
          badgeImageURL={badge} />
      ) : null}
    </>
  );
};

export default FirstBook;
