/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import LoneWolfImage from "@/assets/badges/Badge-lonewolf-badge-image.jpg";
import BadgeTemplate from "./BadgeTemplate";

type Props = {
  loneWolf: boolean;
};

const BookWorm: React.FC<Props> = ({ loneWolf }) => {
  const badge = LoneWolfImage.src;

  return (<>{loneWolf ?
    <BadgeTemplate
      title={"Lone Worm - have been the only person to score a book"}
      badgeImageURL={badge} />
    : null}</>);
};

export default BookWorm;
