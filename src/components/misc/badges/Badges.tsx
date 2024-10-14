import React from "react";
import BookWorm from "./badge-folder/BookWorm";
import LoneWolf from "./badge-folder/LoneWolf";
import style from "./Badges.module.css";
import CommentWorm from "./badge-folder/CommentWorm";
import FirstBook from "./badge-folder/FirstBook";
import GodWorm from "./badge-folder/GodWorm";

type Props = {
  badgeData: {
    loneWolf: boolean;
    allBooks: boolean;
    mostBooks: boolean;
    fiveComments: boolean;
    firstBook: boolean;
  };
};

const Badges: React.FC<Props> = ({ badgeData }) => {
  return (
    <div className={style.badgesCon}>
      <FirstBook firstBookWorm={badgeData?.firstBook} />
      <BookWorm bookWorm={badgeData?.allBooks} />
      <LoneWolf loneWolf={badgeData?.loneWolf} />
      <CommentWorm commentWorm={badgeData?.fiveComments} />
      <GodWorm godWorm={badgeData?.mostBooks} />
    </div>
  );
};

export default Badges;
