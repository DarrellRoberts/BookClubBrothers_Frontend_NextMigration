/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import BookWormImage from "@/assets/badges/Badge.worm-badge-image.jpg";
import BadgeTemplate from "../BadgeTemplate";
import Link from "next/link";
import style from "../badges.module.css";

type Props = {
  bookWorm: boolean;
};

const BookWorm: React.FC<Props> = ({ bookWorm }) => {
  const badge = BookWormImage.src;

  const content = (
    <div className={style.contentCon}>
      <img src={badge} alt="Book Worm" width="250px" />
      <p>Read the most books at one time</p>
      <Link className="underline" href="/club/badges">
        what's this?
      </Link>
    </div>
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
