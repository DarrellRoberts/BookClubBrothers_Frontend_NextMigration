import React, { useState } from "react";
import LoneWolfImage from "@/assets/badges/Badge-lonewolf-badge-image.jpg";
import BadgeTemplate from "./BadgeTemplate";
import { useEffect } from "react";
import { type Book } from "@/types/BookInterface";

type Props = {
  userReadBooks: Book[];
};

const BookWorm: React.FC<Props> = ({ userReadBooks }) => {
  const [showWolf, setShowWolf] = useState<boolean>(false);
  const badge = LoneWolfImage.src;

  const handleBadge = () => {
    const readLengthArray = userReadBooks?.map(book => book.scoreRatings.raterId.length);
    readLengthArray.includes(1) ? setShowWolf(true) : setShowWolf(false);
  };

  useEffect(() => {
    handleBadge();
    [];
  });
  return (
    <>
      {showWolf ? (
        <BadgeTemplate badgeImageURL={badge} />
      ) : null}
    </>
  );
};

export default BookWorm;
