/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import BookWormImage from "@/assets/badges/Badge.worm-badge-image.jpg";
import BadgeTemplate from "../BadgeTemplate";
import Link from "next/link";

type Props = {
  bookWorm: boolean;
};

const BookWorm: React.FC<Props> = ({ bookWorm }) => {
  const badge = BookWormImage.src;

  const content = (
    <>
      <p>Read the most books at one time</p>
      <Link className="underline" href="/club/badges">what's this?</Link>
    </>
  );

  return (
    <>
      {bookWorm ? (
        <BadgeTemplate
          title={"Book Worm"}
          content={content}
          badgeImageURL={badge}
        />
      ) : null}
    </>
  );
};

export default BookWorm;
