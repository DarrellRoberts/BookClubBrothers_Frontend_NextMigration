/* eslint-disable react/react-in-jsx-scope */
import { Button } from "antd"
import Link from "next/link"

const BookHomepage: React.FC = () => {
  return (
    <div className="h-[calc(85vh-100px)] max-xs:h-[calc(85vh-75px)]">
      <h1 className="text-8xl m-5 max-lg:text-6xl max-lg:text-center">
        The Books
      </h1>
      <div className="flex justify-center ">
        <div className="flex justify-evenly w-full">
          <Link href="/books/library">
            <Button size="large">Library</Button>
          </Link>

          <Link href="/books/randomiser">
            <Button size="large">Randomiser</Button>
          </Link>

          <Link href="/books/quiz">
            <Button size="large">Quiz</Button>
          </Link>

          <Link href="/books/stats">
            <Button size="large">Book Stats</Button>
          </Link>
        </div>
      </div>
      <div
        className="flex justify-center mt-10 h-2/3"
        style={{
          backgroundImage: `url('/book-dashboard-library-background-image.webp')`,
          backgroundPosition: "50% 70%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  )
}

export default BookHomepage
