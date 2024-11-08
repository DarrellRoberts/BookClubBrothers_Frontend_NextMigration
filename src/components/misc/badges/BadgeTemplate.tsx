/* eslint-disable react/no-unescaped-entities */
import React, { ReactNode } from "react";
import { Popover } from "antd";
import style from "./badges.module.css";
import "./popover.css";
import "./icon-number.css";

type Props = {
  badgeImageURL: string;
  title: string;
  content: string | ReactNode;
};

const Badges: React.FC<Props> = ({ badgeImageURL, title, content }) => {
  return (
    <Popover title={title} content={content}>
      <img className={style.badgeTemplate} src={badgeImageURL}></img>
    </Popover>
  );
};

export default Badges;
