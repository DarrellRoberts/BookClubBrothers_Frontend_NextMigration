import Link from "next/link"
import style from "./homepage.module.css"

const Homepage: React.FC = () => {
  return (
    <>
      <div className="flex justify-center mt-10 text-center">
        <h1 className={style.homepageTitle}>The Book Club Brothers</h1>
      </div>

      <div className={style.brothersCon}>
        <div className={style.book}>
          <Link
            href="/books"
            className={style.bookEgg}
            data-testid="book-egg-link"
          >
            <h2 className="mt-5 text-4xl">Book</h2>
          </Link>

          <Link
            href="/club"
            className={style.clubEgg}
            data-testid="club-egg-link"
          >
            <h2 className="mt-5 text-4xl">Club</h2>
          </Link>

          <Link
            href="/brothers"
            className={style.brothersEgg}
            data-testid="brothers-egg-link"
          >
            <h2 className="mt-10 text-4xl">Brothers</h2>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Homepage
