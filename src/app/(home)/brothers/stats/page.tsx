/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/react-in-jsx-scope */
import style from "./stats.module.css";
import { userData } from "@/functions/data-fetch-functions/userData";
import { bookData } from "@/functions/data-fetch-functions/bookData";

const BrothersStats: React.FC = async () => {
  return (
    <>
      <h1 className={style.statsTitle}>Brothers Stats</h1>
      <div className={style.leagueCon}>
        <div className={style.leagueTable}>
          <div className={style.usernameColumn}>
            <h2 className="underline">Username</h2>
            {userData?.map((title, index) => (
              <h2 key={index}>{title.username}</h2>
            ))}
          </div>

          <div className={style.booksReadColumn}>
            <h2 className="underline">Books read %</h2>
            {userData?.map((title, index) => (
              <h2 key={index}>
                {parseFloat(
                  (
                    (title.userInfo?.books?.score?.length / bookData?.length) *
                    100
                  ).toFixed(2)
                )}
                %
              </h2>
            ))}
          </div>

          <div className={style.averageScoreColumn}>
            <h2 className="underline">Average Score</h2>
            {userData?.map((title, index) => (
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
            {userData?.map((title, index) => (
              <h2 key={index}>{Math.max(...title.userInfo?.books?.score)}</h2>
            ))}
          </div>

          <div className={style.lowestScoreColumn} id={style.Nextcolumn}>
            <h2 className="underline">Lowest Score</h2>
            {userData?.map((title, index) => (
              <h2 key={index}>{Math.min(...title.userInfo?.books?.score)}</h2>
            ))}
          </div>

          <div className={style.highestBookColumn} id={style.Nextcolumn}>
            <h2 className="underline">Best book</h2>
            {userData?.map((title, index) => (
              <h2 key={index}>
                {
                  bookData?.find(
                    (book) =>
                      book._id ===
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
            {userData?.map((title, index) => (
              <h2 key={index}>
                {
                  bookData?.find(
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
            {userData?.map((title, index) => (
              <h2 key={index}>{title.username}</h2>
            ))}
          </div>

          <div className={style.lowestScoreColumn} id={style.Nexttable}>
            <h2 className="underline">Lowest Score</h2>
            {userData?.map((title, index) => (
              <h2 key={index}>{Math.min(...title.userInfo?.books?.score)}</h2>
            ))}
          </div>

          <div className={style.highestScoreColumn} id={style.Nexttable}>
            <h2 className="underline">Highest Score</h2>
            {userData?.map((title, index) => (
              <h2 key={index}>{Math.max(...title.userInfo?.books?.score)}</h2>
            ))}
          </div>
        </div>

        <div className={style.leagueTableThree}>
          <div className={style.usernameColumn} id={style.Nexttable}>
            <h2 className="underline">Username</h2>
            {userData?.map((title, index) => (
              <h2 key={index}>{title.username}</h2>
            ))}
          </div>

          <div className={style.lowestBookColumn} id={style.Nexttable}>
            <h2 className="underline">Worst Book</h2>
            {userData?.map((title, index) => (
              <h2 key={index}>
                {
                  bookData?.find(
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
            {userData?.map((title, index) => (
              <h2 key={index}>
                {
                  bookData?.find(
                    (book) =>
                      book._id ===
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
