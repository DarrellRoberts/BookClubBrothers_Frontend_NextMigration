import React from 'react';
import { Popover } from "antd";
import style from "./Badges.module.css";

type Props = {
  badgeImageURL: string,
  title: string
}

const Badges: React.FC<Props> = ({badgeImageURL, title}) => {
  return (
    <Popover title={title}>
      <img
        className={style.badgeTemplate}
        src={badgeImageURL}
      ></img>
    </Popover>
  );
};

export default Badges;
