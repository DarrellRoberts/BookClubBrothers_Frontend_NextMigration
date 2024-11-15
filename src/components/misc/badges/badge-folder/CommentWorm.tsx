/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import CommentWormImage from "@/assets/badges/Badge-comment.badge-image.jpg";
import BadgeTemplate from "../BadgeTemplate";
import Link from "next/link";
import style from "../badges.module.css";

type Props = {
  commentWorm: boolean;
};

const BookWorm: React.FC<Props> = ({ commentWorm }) => {
  const badge = CommentWormImage.src;
  const content = (
    <div className={style.contentCon}>
      <img src={badge} alt="Comment Worm" width="250px" />
      <p>Have commented on five or more books</p>
      <Link className="underline" href="/club/badges">
        what's this?
      </Link>
    </div>
  );

  return (
    <>
      {commentWorm ? (
        <BadgeTemplate
          title={"Comment Worm"}
          content={content}
          badgeImageURL={badge}
        />
      ) : null}
    </>
  );
};

export default BookWorm;
