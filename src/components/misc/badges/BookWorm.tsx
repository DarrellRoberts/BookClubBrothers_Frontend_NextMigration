/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import BookWormImage from "@/assets/badges/Badge.worm-badge-image.jpg";
import BadgeTemplate from "./BadgeTemplate";

type Props = {
  bookWorm: boolean
};

const BookWorm: React.FC<Props> = ({ bookWorm }) => {
  const badge = BookWormImage.src;

  return (
    <>
      {bookWorm ? (
        <BadgeTemplate
          title={"Book Worm - read the most books at one time"}
          badgeImageURL={badge} />
      ) : null}
    </>
  );
};

export default BookWorm;
