import React from 'react';
import style from "./Badges.module.css";

type Props = {
  badgeImageURL: string,
}

const Badges: React.FC<Props> = ({badgeImageURL}) => {
  return (
    <img
      className={style.badgeTemplate}
      src={badgeImageURL}
    ></img>
  );
};

export default Badges;
