/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import { useState, useEffect } from "react"
import RatingButton from "../../../forms/ratingform/RatingButton"
import EditRatingButton from "../../../forms/ratingform/EditRatingButton"
import { useJwt } from "react-jwt"
import { Book } from "@/types/BookInterface"
import { useAppSelector } from "@/store/lib/hooks"
import { Skeleton } from "antd"

type Props = {
  bookData: Book
  id: string
  loading: boolean
  hideScores: boolean
}

const RatingCon: React.FC<Props> = ({ bookData, id, loading, hideScores }) => {
  const [users, setUserData] = useState([])
  const [showRating, setShowRating] = useState<boolean>(false)
  const [showEditRating, setShowEditRating] = useState<boolean>(false)
  const [error, setError] = useState("")

  const token = useAppSelector((state) => state.token.tokenState)
  const { decodedToken }: { decodedToken?: { username: string } } =
    useJwt(token)
  const username = decodedToken?.username
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

  const getData = async () => {
    try {
      const data = await fetch(
        `https://bookclubbrothers-backend.onrender.com/users`
      )
      const user = await data.json()
      setUserData(user)
    } catch (err) {
      setError(err)
      console.log(error)
    }
  }

  const findUser = (id) => {
    if (users.length === 0) return null
    const user = users.find((user) => user._id === id)
    return user ? user.username : "user not found"
  }

  const raterArr2 = bookData?.scoreRatings?.raterId?.map((id) => findUser(id))

  let raterObj: object = {}
  const findBookScore = () => {
    for (let i = 0; i < raterArr2?.length; i++) {
      raterObj[raterArr2[i]] = bookData?.scoreRatings?.rating[i]
      findUser(raterObj[bookData?.scoreRatings?.rating[i]])
    }
    raterObj = Object.entries(raterObj)
    return raterObj
  }
  findBookScore()

  const shortStoryRatingsByRater = {}
  const findShortStoriesScoresCorrected = () => {
    if (!bookData?.shortStories) return {}
    if (users.length === 0) return {}
    bookData.shortStories.forEach((story) => {
      const title = story.title
      const scoreRatings = story.scoreRatings
      if (scoreRatings && scoreRatings.raterId && scoreRatings.rating) {
        scoreRatings.raterId.forEach((raterId, index) => {
          const username = findUser(raterId)
          if (username === "user not found" || username === null) return
          const rating = scoreRatings.rating[index]
          if (!shortStoryRatingsByRater[username]) {
            shortStoryRatingsByRater[username] = {}
          }
          shortStoryRatingsByRater[username][title] = rating
        })
      }
    })
    return shortStoryRatingsByRater
  }
  findShortStoriesScoresCorrected()

  const findRatingByUsername = (raterObj, username) => {
    const result = raterObj?.find((pair) => pair[0] === username)
    if (result) {
      return result[1]
    } else {
      return false
    }
  }
  const initialRating = findRatingByUsername(raterObj, username)

  useEffect(() => {
    if (!loading) {
      getData()
    }
  }, [loading])

  return (
    <div className="border-2 border-[var(--default-border-color)] flex flex-col w-[600px] max-md:w-full ml-4 max-md:m-0">
      <h2 className="text-4xl text-center font-main underline">Ratings</h2>
      {!bookData ? (
        <div className="flex flex-col gap-4 mt-4">
          <div className="flex flex-col gap-2">
            <Skeleton.Input
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
            <Skeleton.Input
              active={true}
              size="large"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton.Input
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
            <Skeleton.Input
              active={true}
              size="large"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton.Input
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
            <Skeleton.Input
              active={true}
              size="large"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton.Input
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
            <Skeleton.Input
              active={true}
              size="large"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Skeleton.Input
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
            <Skeleton.Input
              active={true}
              size="large"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </div>
        </div>
      ) : Array.isArray(raterObj) ? (
        raterObj.map(([name, value], index) => (
          <div key={index}>
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
                      : `${value * 10}%`,
                  padding:
                    hideScores && username !== name ? "0.5rem 1rem" : "0",
                  borderRadius: hideScores && username !== name ? "50%" : "0",
                }}
              >
                {hideScores && username !== name ? "?" : value.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col h-full">
              {shortStoryRatingsByRater[`${name}`] &&
                Object.entries(shortStoryRatingsByRater[`${name}`])?.map(
                  ([title, value]: [string, number], index) => (
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
                          : title + ": " + value.toFixed(2)}
                      </span>
                    </h2>
                  )
                )}
            </div>
          </div>
        ))
      ) : (
        Object.entries(raterObj).map(([name, value], index) => (
          <li className="list-none mb-1 ml-2" key={index}>
            {name}: {hideScores && username !== name ? "?" : value}
          </li>
        ))
      )}

      <li className="list-none mt-auto font-bold">
        Group Rating:{" "}
        {bookData?.totalScore
          ? hideScores
            ? "?"
            : Math.floor(bookData?.totalScore * 100) / 100
          : "Pending..."}
      </li>
      {decodedToken ? (
        <div className="flex justify-center">
          {initialRating ? (
            <EditRatingButton
              showEditRating={showEditRating}
              setShowEditRating={setShowEditRating}
              id={id}
              initialRating={initialRating}
              bookData={bookData}
              shortStoryData={shortStoryRatingsByRater[username]}
              isAnthology={bookData?.shortStories.length > 0}
            />
          ) : (
            <RatingButton
              showRating={showRating}
              setShowRating={setShowRating}
              id={id}
              bookData={bookData}
              isAnthology={bookData?.shortStories.length > 0}
            />
          )}
        </div>
      ) : null}
    </div>
  )
}

export default RatingCon
