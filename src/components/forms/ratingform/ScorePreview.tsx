import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { User } from "@/types/UserInterface"
import { findBook } from "@/utils/find-functions/find"
import { useRouter } from "next/navigation"
import { useEffect, useMemo } from "react"
import { useJwt } from "react-jwt"

type Props = {
  users: User[]
  rating: number
  initialRating?: number
  bookTitle: string
}

const ScorePreview = ({ users, rating, bookTitle, initialRating }: Props) => {
  const { bookData } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  )
  const token = useAppSelector((state) => state.token.tokenState)
  const { decodedToken }: { decodedToken?: { username: string; _id: string } } =
    useJwt(token)

  const router = useRouter()

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
      let currentIndex = arr.findIndex((book) => book.title === bookTitle)
      if (rating !== 0) {
        if (arr[currentIndex]) {
          arr[currentIndex].score = rating
        } else {
          const obj = { title: bookTitle, score: rating }
          arr.push(obj)
        }
        arr.sort((a, b) => a.score - b.score)
        currentIndex = arr.findIndex((book) => book.title === bookTitle)
        arr[currentIndex].title = `#${arr.length - currentIndex} ` + bookTitle
        // router.push("#currentBook")
        return arr
      } else {
        return null
      }
    } else {
      return null
    }
  }, [user, bookData, rating])

  useEffect(() => {
    router.push("#currentBook")
  }, [rating])

  return (
    <>
      <h2 className="text-xl underline text-white">Your Adjacent Scores</h2>
      <div
        className={`
            relative h-20 overflow-hidden text-white
            [mask-image:linear-gradient(to_bottom,transparent_0%,black_70%,black_90%,transparent_100%)]
            [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_40%,black_90%,transparent_100%)]
        `}
      >
        <div
          className={`text-white transition-all transition-discrete h-full overflow-y-scroll scroll-smooth
        
        [&::-webkit-scrollbar]:w-[20px] [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded-lg [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-lg [&::-webkit-scrollbar-thumb:hover]:bg-gray-600`}
        >
          <div className="pt-5" />
          {createScoreObj?.map((book, index) => (
            <div
              key={book?.title}
              id={
                createScoreObj[index + 1]?.title?.includes("#") ||
                book?.title?.includes("#")
                  ? "currentBook"
                  : null
              }
              className={`${
                book?.title?.includes("#") ? "font-bold" : "text-gray-300"
              } text-lg flex justify-between mr-3 ${
                index === createScoreObj.length - 1 && "pb-4"
              } ${index === 0 && "pt-5"}`}
            >
              <span>{book?.title}: </span>
              <span>{book?.score}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ScorePreview
