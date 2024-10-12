import React from "react";
import BookWorm from "./BookWorm";
import LoneWolf from "./LoneWolf";
import style from "./Badges.module.css";

type Props = {
  badgeData: {
    loneWolf: boolean,
    allBooks: boolean,
    mostBooks: boolean
  };
};

const Badges: React.FC<Props> = ({ badgeData}) => {

  return (
    <div className={style.badgesCon}>
      <BookWorm  bookWorm={badgeData?.allBooks}/>
      <LoneWolf  loneWolf={badgeData?.loneWolf}/>
    </div>
  );
};

export default Badges;
