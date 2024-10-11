import React, { useState } from "react";
import BookWormImage from "@/assets/badges/Badge.worm-badge-image.jpg";
import BadgeTemplate from "./BadgeTemplate";
import { useEffect } from "react";
import { type User } from "@/types/UserInterface";

type Props = {
  userId: string;
  userData: User[];
};

const BookWorm: React.FC<Props> = ({ userData, userId }) => {
  const [showWorm, setShowWorm] = useState<boolean>(false);
  const badge = BookWormImage.src;

  const readLengthArray = userData?.map(
    (user) => user.userInfo.books.booksScored.length
  );

  const longestLength = Math.max(...readLengthArray);

  const userLongestLength = userData?.filter(
    (user) => user.userInfo.books.booksScored.length === longestLength
  );
  const handleBadge = () => {
    const idArrays = userLongestLength?.map((user) => user._id);
    idArrays.includes(userId) ? setShowWorm(true) : setShowWorm(false);
  };

  useEffect(() => {
    handleBadge();
    [];
  });
  return (
    <>
      {showWorm ? (
        <BadgeTemplate badgeImageURL={badge} />
      ) : null}
    </>
  );
};

export default BookWorm;
