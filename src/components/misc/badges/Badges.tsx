import React from "react";
import BookWorm from "./BookWorm";
import { type User } from "@/types/UserInterface";
import style from "./Badges.module.css";

type Props = {
  userId: string;
  userData: User[];
};

const Badges: React.FC<Props> = ({ userId, userData}) => {
  return (
    <div className={style.badgesCon}>
      <BookWorm userData={userData} userId={userId} />
    </div>
  );
};

export default Badges;
