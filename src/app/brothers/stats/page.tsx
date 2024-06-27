/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/react-in-jsx-scope */
// import "../../../style/brotherStatsRes.css"
// import "../../../style/brotherStats.css"

import style from "./stats.module.css";

async function getUserData() {
  const response = await fetch(
    "https://bookclubbrothers-backend.onrender.com/users",
    { next: { revalidate: 5 } }
  );
  return response.json();
}

async function getBookData() {
  const response = await fetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    { next: { revalidate: 5 } }
  );
  return response.json();
}

const BrothersStats: React.FC = async () => {
  const userPromise = getUserData();
  const bookPromise = getBookData();

  const user = await userPromise;
  const book = await bookPromise;

  const readBooks = book.filter((book) => book.read === true);
  return (
    <>
      <h1 className={style.statsTitle}>Brothers Stats</h1>
      <div className={style.leagueCon}>
        <div className={style.leagueTable}>
          <div className={style.usernameColumn}>
            <h2 className="underline">Username</h2>
            {user?.map((title, index) => (
              <h2 key={index}>{title.username}</h2>
            ))}
          </div>

          <div className={style.booksReadColumn}>
            <h2 className="underline">Books read %</h2>
            {user?.map((title, index) => (
              <h2 key={index}>
                {parseFloat(
                  (
                    (title.userInfo?.books?.score?.length / readBooks?.length) *
                    100
                  ).toFixed(2)
                )}
                %
              </h2>
            ))}
          </div>

          <div className={style.averageScoreColumn}>
            <h2 className="underline">Average Score</h2>
            {user?.map((title, index) => (
              <h2 key={index}>
                {parseFloat(
                  (
                    title.userInfo?.books?.score?.reduce((a, b) => a + b, 0) /
                    title.userInfo?.books?.score?.length
                  ).toFixed(2)
                )}
              </h2>
            ))}
          </div>

          <div className={style.highestScoreColumn} id={style.Nextcolumn}>
            <h2 className="underline">Highest Score</h2>
            {user?.map((title, index) => (
              <h2 key={index}>{Math.max(...title.userInfo?.books?.score)}</h2>
            ))}
          </div>

          <div className={style.lowestScoreColumn} id={style.Nextcolumn}>
            <h2 className="underline">Lowest Score</h2>
            {user?.map((title, index) => (
              <h2 key={index}>{Math.min(...title.userInfo?.books?.score)}</h2>
            ))}
          </div>

          <div className={style.highestBookColumn} id={style.Nextcolumn}>
            <h2 className="underline">Best book</h2>
            {user?.map((title, index) => (
              <h2 key={index}>
                {
                  book.find(
                    (book) =>
                      book._id ===
                      //matching id of book with highest score
                      //then accessing its title
                      title.userInfo?.books?.booksScored[
                        title.userInfo?.books?.score?.indexOf(
                          Math.max(...title.userInfo?.books?.score)
                        )
                      ]
                  )?.title
                }
              </h2>
            ))}
          </div>

          <div className={style.lowestBookColumn} id={style.Nextcolumn}>
            <h2 className="underline">Worst Book</h2>
            {user?.map((title, index) => (
              <h2 key={index}>
                {
                  book.find(
                    (book) =>
                      book._id ===
                      //matching id of book with lowest score
                      //then accessing its title
                      title.userInfo?.books?.booksScored[
                        title.userInfo?.books?.score?.indexOf(
                          Math.min(...title.userInfo?.books?.score)
                        )
                      ]
                  )?.title
                }
              </h2>
            ))}
          </div>
        </div>

        <div className={style.leagueTableTwo}>
          <div className={style.usernameColumn} id={style.Nexttable}>
            <h2 className="underline">Username</h2>
            {user?.map((title, index) => (
              <h2 key={index}>{title.username}</h2>
            ))}
          </div>

          <div className={style.lowestScoreColumn} id={style.Nexttable}>
            <h2 className="underline">Lowest Score</h2>
            {user?.map((title, index) => (
              <h2 key={index}>{Math.min(...title.userInfo?.books?.score)}</h2>
            ))}
          </div>

          <div className={style.highestScoreColumn} id={style.Nexttable}>
            <h2 className="underline">Highest Score</h2>
            {user?.map((title, index) => (
              <h2 key={index}>{Math.max(...title.userInfo?.books?.score)}</h2>
            ))}
          </div>
        </div>

        <div className={style.leagueTableThree}>
          <div className={style.usernameColumn} id={style.Nexttable}>
            <h2 className="underline">Username</h2>
            {user?.map((title, index) => (
              <h2 key={index}>{title.username}</h2>
            ))}
          </div>

          <div className={style.lowestBookColumn} id={style.Nexttable}>
            <h2 className="underline">Worst Book</h2>
            {user?.map((title, index) => (
              <h2 key={index}>
                {
                  book.find(
                    (book) =>
                      book._id ===
                      //matching id of book with lowest score
                      //then accessing its title
                      title.userInfo?.books?.booksScored[
                        title.userInfo?.books?.score?.indexOf(
                          Math.min(...title.userInfo?.books?.score)
                        )
                      ]
                  )?.title
                }
              </h2>
            ))}
          </div>

          <div className={style.highestBookColumn} id={style.Nexttable}>
            <h2 className="underline">Best book</h2>
            {user?.map((title, index) => (
              <h2 key={index}>
                {
                  book.find(
                    (book) =>
                      book._id ===
                      //matching id of book with highest score
                      //then accessing its title
                      title.userInfo?.books?.booksScored[
                        title.userInfo?.books?.score?.indexOf(
                          Math.max(...title.userInfo?.books?.score)
                        )
                      ]
                  )?.title
                }
              </h2>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrothersStats;
