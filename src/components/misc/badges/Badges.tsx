import React from "react";
import BookWorm from "./BookWorm";
import { type User } from "@/types/UserInterface";
import { type Book } from "@/types/BookInterface";
import style from "./Badges.module.css";
import LoneWolf from "./LoneWolf";


type Props = {
  userId: string;
  userData: User[];
  userReadBooks: Book[];
};

const Badges: React.FC<Props> = ({ userId, userData, userReadBooks}) => {
  return (
    <div className={style.badgesCon}>
      <BookWorm userData={userData} userId={userId} />
      <LoneWolf userReadBooks={userReadBooks}/>
    </div>
  );
};

export default Badges;
