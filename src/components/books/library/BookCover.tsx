"use client"

import { useJwt } from "react-jwt"
import useUserFetch from "@/hooks/fetch-hooks/useUserFetch"
import { useAppSelector } from "@/store/lib/hooks"

type Props = {
  title: string
  totalScore: number
  ratingArr: number[] | number
  raterArr: string[]
  hideScores: boolean
  isSingleBook?: boolean
}

const BookCover: React.FC<Props> = ({
  title,
  totalScore,
  ratingArr,
  raterArr,
  hideScores,
  isSingleBook,
}) => {
  const token = useAppSelector((state) => state.token.tokenState)
  const { decodedToken }: { decodedToken?: { username: string; _id: string } } =
    useJwt(token)
  const username = decodedToken?.username

  const { userData, loadingUsers, error } = useUserFetch(
    `https://bookclubbrothers-backend.onrender.com/users`,
    null
  )

  const findUser = (id) => {
    const user = userData?.find((user) => user._id === id)
    return user ? user.username : "user not found"
  }

  const raterArr2 = raterArr?.map((id) => findUser(id))

  let raterObj: object = {}
  const findBookScore = () => {
    if (raterArr2) {
      for (let i = 0; i < raterArr2.length; i++) {
        raterObj[raterArr2[i]] = ratingArr[i]
        findUser(raterObj[raterArr[i]])
      }
      raterObj = Object.entries(raterObj)
      return raterObj
    }
  }
  findBookScore()

  return (
    <>
      <div
        className={
          isSingleBook
            ? "w-[600px] h-[400px] border-2 border-[var(--default-border-color)] flex justify-center text-center items-center border-solid m-5 max-md:w-[275px] max-md:h-[350px]"
            : "flex justify-center items-center text-center border-5 border-solid border-[var(--default-border-color)] h-63 aspect-[1.55/1] max-xs:w-75"
        }
      >
        <div className="flex h-full w-full">
          <div className="leftcover flex w-[45%] flex-col items-center justify-center bg-black text-white">
            <h2 className="font-main text-2xl max-md:text-base">{title}</h2>
            <h2 className="font-main text-2xl max-md:text-base">
              (Image pending)
            </h2>
          </div>
          <div className="flex flex-col items-start font-main text-xl ml-2 max-md:text-base">
            <h2 className="underline mb-5">Book Club Brothers</h2>

            {Array.isArray(raterObj) && !loadingUsers ? (
              raterObj.map(([name, value]) => (
                <li className="list-none mb-1 ml-2" key={name}>
                  {name}:{" "}
                  {hideScores && username !== name ? "?" : value.toFixed(2)}
                </li>
              ))
            ) : error ? (
              <li>{error?.message}</li>
            ) : (
              <li className="list-none mb-1 ml-2">Score Pending...</li>
            )}

            <li className="list-none mt-auto font-bold">
              Group Rating:{" "}
              {totalScore
                ? hideScores
                  ? "?"
                  : Math.floor(totalScore * 100) / 100
                : "Pending..."}
            </li>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookCover
