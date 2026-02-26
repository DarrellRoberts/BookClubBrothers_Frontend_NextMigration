"use client"

import { useParams } from "next/navigation"
import { useJwt } from "react-jwt"
import CommentCon from "@/components/brothers/dashboard/BrotherCommentCon"
import { useAppSelector } from "@/store/lib/hooks"
import BrotherBanner from "@/components/brothers/dashboard/BrotherBanner"
import BrotherBooksScored from "@/components/brothers/dashboard/BrotherBooksScored"
import BrotherLoadingBanner from "@/components/brothers/dashboard/BrotherLoadingBanner"
import BrotherLoadingBooksScored from "@/components/brothers/dashboard/BrotherLoadingBooksScored"
import BrotherLoadingCommentCon from "@/components/brothers/dashboard/BrotherLoadingCommentCon"
import { API_BOOKS, API_USERS, config } from "@/configs/config"
import { useGetQuery } from "@/hooks/fetch-hooks/useGetQuery"
import { User } from "@/types/UserInterface"
import { Book } from "@/types/BookInterface"

const Dashboard: React.FC = () => {
  const { data: userData, isLoading: isLoadingUsers } = useGetQuery<User[]>({
    queryKey: ["users"],
    apiPath: API_USERS,
  })

  const { data: bookData, isLoading: isLoadingBooks } = useGetQuery<Book[]>({
    queryKey: ["books"],
    apiPath: API_BOOKS,
  })

  const readBooks = bookData?.length
    ? bookData?.filter((book) => book.read === true)
    : []

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
      {isLoadingBooks ? (
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
              loadingBooks={isLoadingBooks}
              loadingUsers={isLoadingUsers}
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
