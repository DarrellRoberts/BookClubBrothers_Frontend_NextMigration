/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import CommentWormImage from "@/assets/badges/Badge-comment.badge-image.jpg";
import BadgeTemplate from "./BadgeTemplate";

type Props = {
  commentWorm: boolean;
};

const BookWorm: React.FC<Props> = ({ commentWorm }) => {
  const badge = CommentWormImage.src;
  console.log(commentWorm);
  return (<>{commentWorm ?
    <BadgeTemplate
      title={"Comment Worm"}
      content={"Have commented on five or more books"}
      badgeImageURL={badge} />
    : null}</>);
};

export default BookWorm;
