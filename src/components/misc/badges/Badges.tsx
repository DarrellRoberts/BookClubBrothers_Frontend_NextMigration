import React from "react";
import BookWorm from "./BookWorm";
import LoneWolf from "./LoneWolf";
import style from "./Badges.module.css";
import CommentWorm from "./CommentWorm";
import FirstBook from "./FirstBook";

type Props = {
  badgeData: {
    loneWolf: boolean,
    allBooks: boolean,
    mostBooks: boolean,
    fiveComments: boolean,
    firstBook: boolean
  };
};

const Badges: React.FC<Props> = ({ badgeData}) => {

  return (
    <div className={style.badgesCon}>
      <FirstBook firstBookWorm={badgeData?.firstBook} />
      <BookWorm  bookWorm={badgeData?.allBooks}/>
      <LoneWolf  loneWolf={badgeData?.loneWolf}/>
      <CommentWorm commentWorm={badgeData?.fiveComments} />
    </div>
  );
};

export default Badges;
