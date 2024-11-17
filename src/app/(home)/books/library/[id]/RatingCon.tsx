/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { useState, useEffect, useContext } from "react";
import RatingButton from "./ratingform/RatingButton";
import EditRatingButton from "./ratingform/EditRatingButton";
import { AuthContext } from "@/context/AuthContext";
import { useJwt } from "react-jwt";
import "../../../../../style/ratingcon.css";
import "../../../../../style/ratingconRes.css";
import { Book } from "@/types/BookInterface";

type Props = {
  bookData: Book;
  id: string;
  loading: boolean;
  hideScores: boolean;
};

const RatingCon: React.FC<Props> = ({ bookData, id, loading, hideScores }) => {
  const [users, setUserData] = useState([]);
  const [showRating, setShowRating] = useState<boolean>(false);
  const [showEditRating, setShowEditRating] = useState<boolean>(false);
  const [error, setError] = useState("");

  const { token } = useContext(AuthContext);
  const { decodedToken }: { decodedToken?: { username: string } } =
    useJwt(token);
  const username = decodedToken?.username;

  const getData = async () => {
    try {
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/users`
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

  const raterArr2 = bookData?.scoreRatings?.raterId?.map((id) => findUser(id));

  let raterObj: object = {};
  const findBookScore = () => {
    for (let i = 0; i < raterArr2?.length; i++) {
      raterObj[raterArr2[i]] = bookData?.scoreRatings?.rating[i];
      findUser(raterObj[bookData?.scoreRatings?.rating[i]]);
    }
    raterObj = Object.entries(raterObj);
    return raterObj;
  };
  findBookScore();

  // function to find initialRating
  const findRatingByUsername = (raterObj, username) => {
    const result = raterObj?.find((pair) => pair[0] === username);
    if (result) {
      return result[1]; // Return the rating if username is found
    } else {
      return false;
    }
  };
  const initialRating = findRatingByUsername(raterObj, username);

  useEffect(() => {
    if (!loading) {
      getData();
    }
  }, [loading]);

  return (
    <div className="ratingCon">
      <h2 className="ratingTitle underline">Ratings</h2>
      {Array.isArray(raterObj)
        ? raterObj.map(([name, value], index) => (
            <div key={index}>
              <li className="list-none m-2">{name}:</li>
              <div
                className="ratingGraph"
                style={{
                  width:
                    hideScores && username !== name ? "100%" : `${value * 10}%`,
                  backgroundColor:
                    hideScores && username !== name
                      ? "transparent"
                      : "var(--tertiaryColor)",
                  color: "white",
                }}
              >
                {hideScores && username !== name ? "?" : value}
              </div>
            </div>
          ))
        : Object.entries(raterObj).map(([name, value], index) => (
            <li className="list-none mb-1 ml-2" key={index}>
              {name}: {hideScores && username !== name ? "?" : value}
            </li>
          ))}

      <li className="list-none mt-auto font-bold">
        Group Rating:{" "}
        {bookData?.totalScore
          ? hideScores
            ? "?"
            : Math.floor(bookData?.totalScore * 100) / 100
          : "Pending..."}
      </li>
      {decodedToken ? (
        <div className="flex justify-center">
          {initialRating ? (
            <EditRatingButton
              showEditRating={showEditRating}
              setShowEditRating={setShowEditRating}
              id={id}
              initialRating={initialRating}
            />
          ) : (
            <RatingButton
              showRating={showRating}
              setShowRating={setShowRating}
              id={id}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default RatingCon;
