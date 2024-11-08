import React from "react";
import BookWorm from "./badge-folder/BookWorm";
import LoneWolf from "./badge-folder/LoneWolf";
import style from "./badges.module.css";
import CommentWorm from "./badge-folder/CommentWorm";
import FirstBook from "./badge-folder/FirstBook";
import GodWorm from "./badge-folder/GodWorm";
import PunctualWorm from "./badge-folder/PunctualWorm";

type Props = {
  badgeData: {
    loneWolf: number;
    allBooks: boolean;
    mostBooks: boolean;
    fiveComments: boolean;
    firstBook: boolean;
    punctual: number;
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
      <PunctualWorm punctualWorm={badgeData?.punctual} />
    </div>
  );
};

export default Badges;
