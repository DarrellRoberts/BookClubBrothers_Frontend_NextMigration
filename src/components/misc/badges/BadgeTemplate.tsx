/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Popover } from "antd";
import style from "./Badges.module.css";
import "./popover.css";

type Props = {
  badgeImageURL: string,
  title: string,
  content: string
}

const Badges: React.FC<Props> = ({badgeImageURL, title, content}) => {

  return (
    <Popover title={title} content={content}>
      <img
        className={style.badgeTemplate}
        src={badgeImageURL}
      ></img>
    </Popover>
  );
};

export default Badges;
