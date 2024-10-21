import React from "react";
import "@/style/bookHomepage.css";
import "@/style/bookHomepageRes.css";
import Badges from "@/components/misc/badges/Badges";
import style from "./BadgesHomepage.module.css";

const BadgesHomepage: React.FC = () => {
  const badgeData = {
    loneWolf: true,
    allBooks: true,
    mostBooks: true,
    fiveComments: true,
    firstBook: true,
  };
  const badgeTitles = [
    "Brother Worm",
    "Book Worm",
    "Lone Worm",
    "Comment Worm",
    "God of Worms",
  ];
  return (
    <>
      <h1 className="booksTitle">Badges</h1>
      <div className={style.badgeTable}>
        <div className={style.badgeCon}>
          <Badges badgeData={badgeData} />
        </div>
        <div className={style.badgeTitles}>
          {badgeTitles.map((badge, i) => (
            <div key={i}>
              <h2>{badge}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BadgesHomepage;
