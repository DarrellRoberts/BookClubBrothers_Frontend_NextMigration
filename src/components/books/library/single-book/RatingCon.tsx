"use client"

import { useState, useMemo } from "react"
import RatingButton from "../../../forms/ratingform/RatingButton"
import EditRatingButton from "../../../forms/ratingform/EditRatingButton"
import { useJwt } from "react-jwt"
import { Book } from "@/types/BookInterface"
import { useAppSelector } from "@/store/lib/hooks"
import { API_USERS } from "@/configs/config"
import { useGetQuery } from "@/hooks/fetch-hooks/useGetQuery"
import { User } from "@/types/UserInterface"
import { RatingConSkeleton } from "./skeletons/RatingConSkeleton"

type Props = {
  singleBook: Book
  id: string
  loading: boolean
  hideScores: boolean
}

const RatingCon: React.FC<Props> = ({ singleBook, id, hideScores }) => {
  const [showRating, setShowRating] = useState<boolean>(false)
  const [showEditRating, setShowEditRating] = useState<boolean>(false)

  const token = useAppSelector((state) => state.token.tokenState)
  const { decodedToken }: { decodedToken?: { username: string; _id: string } } =
    useJwt(token)
  const username = decodedToken?.username

  const {
    data: users,
    isLoading,
    isError,
  } = useGetQuery<User[]>({
    queryKey: ["users"],
    apiPath: API_USERS,
  })

  const findRatingByUsername = (raterObjArray, username) => {
    const result = raterObjArray?.find((pair) => pair.name === username)
    if (result) {
      return result.bookRating
    } else {
      return false
    }
  }

  const processedRatings = useMemo(() => {
    if (!singleBook || !users?.length) return []

    const userMap = new Map(users.map((u) => [u._id, u.username]))
    const raterIds = singleBook.scoreRatings?.raterId || []
    const ratings = singleBook.scoreRatings?.rating || []

    return raterIds.map((raterId, index) => {
      const name = userMap.get(raterId) || "User not found"
      const bookRating = ratings[index]

      const stories = (singleBook.shortStories || [])
        .map((story) => {
          const storyRaterIdx = story.scoreRatings?.raterId?.indexOf(raterId)
          return {
            title: story.title,
            score:
              storyRaterIdx !== -1
                ? story.scoreRatings?.rating[storyRaterIdx]
                : null,
          }
        })
        .filter((s) => s.score !== null)

      return { name, bookRating, stories }
    })
  }, [users, singleBook])

  const initialRating = findRatingByUsername(processedRatings, username)
  const initialShortStoryRatings =
    processedRatings?.find((user) => user.name === username)?.stories || []
  return (
    <div className="border-2 border-[var(--default-border-color)] flex flex-col h-fit w-[600px] max-md:w-full ml-4 max-md:m-0">
      <h2 className="text-4xl text-center font-main underline">Ratings</h2>
      {isLoading || isError ? (
        <RatingConSkeleton />
      ) : processedRatings?.length > 0 ? (
        processedRatings.map(({ name, bookRating, stories }) => (
          <div key={name}>
            <li className="list-none m-2 font-bold">{name}:</li>
            <div
              className={`flex w-full ${
                hideScores && username !== name
                  ? "justify-center"
                  : "justify-start"
              }`}
            >
              <div
                className="bg-bc-green text-[var(--button-font-color)] text-center font-medium"
                style={{
                  width:
                    hideScores && username !== name
                      ? "fit-content"
                      : `${bookRating * 10}%`,
                  padding:
                    hideScores && username !== name ? "0.5rem 1rem" : "0",
                  borderRadius: hideScores && username !== name ? "50%" : "0",
                }}
              >
                {hideScores && username !== name ? "?" : bookRating?.toFixed(2)}
              </div>
            </div>

            <div className="flex flex-col h-full">
              {stories.map((story, index) => (
                <h2
                  key={index}
                  className="w-full text-center border-b border-solid border-var(--default-border-color) mb-4 mt-4 leading-[0.25em]"
                  style={{
                    borderColor: "var(--default-border-color)",
                  }}
                >
                  <span
                    className="pt-[2px] pb-[2px] pr-[8px] pl-[8px] border"
                    style={{
                      background: "var(--nested-bg-color)",
                      borderColor: "var(--default-border-color)",
                      color: "var(--nested-font-color)",
                    }}
                  >
                    {hideScores && username !== name
                      ? "?"
                      : `${story.title}: ${story.score.toFixed(2)}`}
                  </span>
                </h2>
              ))}
            </div>
          </div>
        ))
      ) : (
        processedRatings.map(({ name, bookRating }) => (
          <li className="list-none mb-1 ml-2" key={name}>
            {name}:{" "}
            {hideScores && username !== name ? "?" : bookRating?.toFixed(2)}
          </li>
        ))
      )}
      <h2 className="text-6xl text-center max-sm:text-4xl font-bold my-5">
        Group Rating:{" "}
        {singleBook?.totalScore
          ? hideScores
            ? "?"
            : Math.floor(singleBook?.totalScore * 100) / 100
          : "Pending..."}
      </h2>
      {decodedToken && (
        <div className="flex justify-center">
          {initialRating ? (
            <EditRatingButton
              showEditRating={showEditRating}
              setShowEditRating={setShowEditRating}
              id={id}
              initialRating={initialRating}
              singleBook={singleBook}
              shortStoryData={initialShortStoryRatings}
              isAnthology={singleBook?.shortStories?.length > 0}
              users={users}
            />
          ) : (
            <RatingButton
              showRating={showRating}
              setShowRating={setShowRating}
              id={id}
              singleBook={singleBook}
              users={users}
              isAnthology={singleBook?.shortStories?.length > 0}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default RatingCon
