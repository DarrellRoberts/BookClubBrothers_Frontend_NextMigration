/* eslint-disable react/react-in-jsx-scope */
import Link from "next/link";
import style from "./homepage.module.css";

const Homepage: React.FC = () => {
  return (
    <>
      <div className="flex justify-center mt-10 text-center">
        <h1 className={style.homepageTitle}>The Book Club Brothers</h1>
      </div>

      <div className={style.brothersCon}>
        <div className={style.book}>
          <Link href="/books">
            <div className={style.bookEgg}>
              <h2 className="mt-5">Book</h2>
            </div>
          </Link>

          <Link href="/club">
            <div className={style.clubEgg}>
              <h2 className="mt-5">Club</h2>
            </div>
          </Link>

          <Link href="/brothers">
            <div className={style.brothersEgg}>
              <h2 className="mt-10">Brothers</h2>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Homepage;
