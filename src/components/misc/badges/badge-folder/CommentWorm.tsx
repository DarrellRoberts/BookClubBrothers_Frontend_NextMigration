/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import CommentWormImage from "@/assets/badges/Badge-comment.badge-image.jpg";
import BadgeTemplate from "../BadgeTemplate";
import Link from "next/link";

type Props = {
  commentWorm: boolean;
};

const BookWorm: React.FC<Props> = ({ commentWorm }) => {
  const badge = CommentWormImage.src;
  const content = (
    <>
      <p>Have commented on five or more books</p>
      <Link className="underline" href="/club/badges">what's this?</Link>
    </>
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
