import React from 'react';
import style from "./Badges.module.css";

type Props = {
  badgeImageURL: string,
  borderColor: string
}

const Badges: React.FC<Props> = ({badgeImageURL, borderColor}) => {
  return (
    <img
      className={style.badgeTemplate}
      src={badgeImageURL}
      style={{borderColor, boxShadow: `0px 0px 15px 0px ${borderColor}`}}
    ></img>
  );
};

export default Badges;
