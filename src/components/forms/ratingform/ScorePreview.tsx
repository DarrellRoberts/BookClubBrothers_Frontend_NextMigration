import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch"
import { useAppSelector } from "@/store/lib/hooks"
import { User } from "@/types/UserInterface"
import { findBook } from "@/utils/find-functions/find"
import { useMemo } from "react"
import { useJwt } from "react-jwt"

type Props = {
  users: User[]
  rating: number
  bookTitle: string
}

const ScorePreview = ({ users, rating, bookTitle }: Props) => {
  const { bookData } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  )
  const token = useAppSelector((state) => state.token.tokenState)
  const { decodedToken }: { decodedToken?: { username: string; _id: string } } =
    useJwt(token)

  const user = users?.find((user) => user._id === decodedToken?._id)
  const createScoreObj = useMemo(() => {
    let arr = []
    if (user) {
      for (let i = 0; i < user?.userInfo.books.booksScored.length; i++) {
        const obj = {}
        obj["title"] = findBook(user?.userInfo?.books?.booksScored[i], bookData)
        obj["score"] = user?.userInfo?.books?.score[i]
        arr.push(obj)
      }
      arr.sort((a, b) => a.score - b.score)
      let currentIndex = arr.findIndex((book) => book.title === bookTitle)
      if (rating !== 0) {
        if (arr[currentIndex]) {
          arr[currentIndex].score = rating
          arr.sort((a, b) => a.score - b.score)
          currentIndex = arr.findIndex((book) => book.title === bookTitle)
          arr[currentIndex].title = `#${arr.length - currentIndex} ` + bookTitle
        } else {
          const obj = { title: bookTitle, score: rating }
          arr.push(obj)
          arr.sort((a, b) => a.score - b.score)
          currentIndex = arr.findIndex((book) => book.title === bookTitle)
          arr[currentIndex].title = `#${arr.length - currentIndex} ` + bookTitle
        }
      }
      if (currentIndex === 0) {
        return [arr[currentIndex], arr[currentIndex + 1], arr[currentIndex + 2]]
      } else if (currentIndex === arr.length - 1) {
        return [arr[currentIndex - 2], arr[currentIndex - 1], arr[currentIndex]]
      } else {
        return [arr[currentIndex - 1], arr[currentIndex], arr[currentIndex + 1]]
      }
    } else {
      return null
    }
  }, [user, bookData, rating])
  return (
    <div
      className={`text-white transition-all transition-discrete ${
        rating === 0 ? "opacity-0" : "opacity-100"
      }`}
    >
      <h2 className="text-xl underline">Your Adjacent Scores</h2>
      {createScoreObj?.map((book, index) => (
        <div
          key={book?.title}
          className={`${
            book?.title?.includes("#") && "font-bold"
          } text-lg flex justify-between`}
        >
          <span>{book?.title}: </span>
          <span>{book?.score}</span>
        </div>
      ))}
    </div>
  )
}

export default ScorePreview
