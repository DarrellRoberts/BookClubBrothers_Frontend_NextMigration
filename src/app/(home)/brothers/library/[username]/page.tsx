/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import { useParams } from "next/navigation"
import LoadingScreen from "@/components/loader/brothers-loader/LoadingScreen"
import { useJwt } from "react-jwt"
import CommentCon from "@/components/brothers/dashboard/BrotherCommentCon"
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch"
import useBookFetch from "@/hooks/fetch-hooks/useReadBookFetch"
import { useAppSelector } from "@/store/lib/hooks"
import BrotherBanner from "@/components/brothers/dashboard/BrotherBanner"
import BrotherBooksScored from "@/components/brothers/dashboard/BrotherBooksScored"
import BrotherLoadingBanner from "@/components/brothers/dashboard/BrotherLoadingBanner"
import BrotherLoadingBooksScored from "@/components/brothers/dashboard/BrotherLoadingBooksScored"
import BrotherLoadingCommentCon from "@/components/brothers/dashboard/BrotherLoadingCommentCon"

const Dashboard: React.FC = () => {
  const { userData, loadingUsers } = useUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users`,
    null
  )

  const { bookData, loadingBooks } = useBookFetch(
    "https://bookclubbrothers-backend.onrender.com/books",
    null
  )

  const readBooks = bookData?.filter((book) => book.read === true)

  const token = useAppSelector((state) => state.token.tokenState)

  const {
    decodedToken,
  }: {
    decodedToken?: {
      username: string
      _id: string
    }
  } = useJwt(token)

  const { username } = useParams()
  const id: string = decodedToken?._id
  const findUser =
    userData?.find((user) => user.username === username) ??
    userData?.find((user) => user._id === id)

  return (
    <>
      {loadingBooks ? (
        <>
          <BrotherLoadingBanner />
          <div>
            <h2 className="underline text-6xl m-6 max-xs:text-4xl max-xs:text-center">
              Books scored
            </h2>
            <BrotherLoadingBooksScored />
          </div>

          <div>
            <h2 className="underline text-6xl m-6 max-xs:text-4xl max-xs:text-center">
              Comments
            </h2>
            <BrotherLoadingCommentCon />
          </div>
        </>
      ) : (
        <>
          <BrotherBanner user={findUser} readBooks={readBooks} />
          <div>
            <h2 className="underline text-6xl m-6 max-xs:text-4xl max-xs:text-center">
              Books scored
            </h2>
            <BrotherBooksScored
              user={findUser}
              loadingBooks={loadingBooks}
              loadingUsers={loadingUsers}
              readBooks={readBooks}
            />
          </div>

          <div>
            <h2 className="underline text-6xl m-6 max-xs:text-4xl max-xs:text-center">
              Comments
            </h2>
            <CommentCon
              username={findUser?.username}
              userId={findUser?._id}
              readBooks={readBooks}
            />
          </div>
        </>
      )}
    </>
  )
}

export default Dashboard
