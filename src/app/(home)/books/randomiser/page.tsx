/* eslint-disable react/react-in-jsx-scope */
"use client";

import style from "@/components/books/randomiser/randomiser.module.css";
import useBookFetch from "@/hooks/fetch-hooks/useUnreadBookFetch";
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch";
import RandomSectionLeft from "@/components/books/randomiser/RandomSectionLeft";
import RandomSectionRight from "@/components/books/randomiser/RandomSectionRight";

const RandomiserHomepage: React.FC = () => {
  const { bookData, loadingBooks, error } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books/unread/all",
    null
  );
  const { userData, loadingUsers } = useUserFetch(
    "https://bookclubbrothers-backend.onrender.com/users",
    null
  );

  return (
    <div>
      <h1 className={style.randomTitle}>Randomiser</h1>
      <div className={style.randomCon}>
        <div className={style.randomBox}>
          <RandomSectionLeft
            bookData={bookData}
            userData={userData}
            loadingBooks={loadingBooks}
            loadingUsers={loadingUsers}
          />
          <RandomSectionRight
            bookData={bookData}
            loadingBooks={loadingBooks}
            userData={userData}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default RandomiserHomepage;
