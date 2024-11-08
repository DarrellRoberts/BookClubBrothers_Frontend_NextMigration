/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState, useEffect } from "react";
import styles from "./BookCover.module.css";
import { type User } from "@/types/UserInterface";

type Props = {
  title: string;
  totalScore: number;
  ratingArr: number[];
  raterArr: string[];
  hideScores: boolean;
};

const BookCover: React.FC<Props> = ({
  title,
  totalScore,
  ratingArr,
  raterArr,
  hideScores,
}) => {
  const [users, setUserData] = useState<Array<User>>([]);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/users`,
        { cache: "force-cache" }
      );
      const user = await data.json();
      setUserData(user);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  const findUser = (id) => {
    const user = users.find((user) => user._id === id);
    return user ? user.username : "user not found";
  };

  const raterArr2 = raterArr?.map((id) => findUser(id));

  let raterObj: object = {};
  const findBookScore = () => {
    if (raterArr2) {
      for (let i = 0; i < raterArr2.length; i++) {
        raterObj[raterArr2[i]] = ratingArr[i];
        findUser(raterObj[raterArr[i]]);
      }
      raterObj = Object.entries(raterObj);
      return raterObj;
    }
  };
  findBookScore();

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex h-[100%] w-[100%]">
        <div className="leftcover  flex flex-col items-center justify-center w-[45%] bg-black text-white">
          <h2 className={styles.titleCover}>{title}</h2>
          <h2 className={styles.titleCover}>(Image pending)</h2>
        </div>
        <div className={`${styles.rightcover} flex flex-col items-start ml-2`}>
          <h2 className="underline mb-5">Book Club Brothers</h2>

          {Array.isArray(raterObj) && raterObj.length > 0 ? (
            raterObj.map(([name, value]) => (
              <li className="list-none mb-1 ml-2" key={name}>
                {name}: {hideScores ? "?" : value}
              </li>
            ))
          ) : (
            <li className="list-none mb-1 ml-2">Score Pending...</li>
          )}

          <li className="list-none mt-auto font-bold">
            Group Rating:{" "}
            {totalScore
              ? hideScores
                ? "?"
                : Math.floor(totalScore * 100) / 100
              : "Pending..."}
          </li>
        </div>
      </div>
    </>
  );
};

export default BookCover;
