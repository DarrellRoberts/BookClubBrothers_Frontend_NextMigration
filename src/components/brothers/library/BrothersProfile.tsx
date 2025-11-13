import Link from "next/link"
import React from "react"
import LoaderNoText from "@/components/loader/LoaderNoText"
import { DoubleLeftOutlined } from "@ant-design/icons"
import PictureUploadButton from "@/components/forms/brotherform/PictureUploadButton"
import EditUsernameButton from "@/components/forms/brotherform/EditUsernameButton"
import EditCityAndCountryButton from "@/components/forms/brotherform/EditCityAndCountryButton"
import EditGenreButton from "@/components/forms/brotherform/EditGenreButton"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import { findBook, findDateOfMeeting } from "@/utils/find-functions/find"
import { User } from "@/types/UserInterface"
import ProfileUnknownUserImage from "@/assets/Profile.unknown-profile-image.jpg"
import { Book } from "@/types/BookInterface"
import { useAuth } from "@/hooks/auth-hooks/useAuth"

type Props = {
  user: User
  userData: User[]
  readBooks: Book[]
}

const BrothersProfile: React.FC<Props> = ({ user, readBooks, userData }) => {
  const { decodedToken } = useAuth()

  let userBookObj = {}

  const updateBookObj = () => {
    if (userData.length === 0) return []
    let bookId = userData?.map(
      (user) =>
        user?.userInfo?.books?.booksScored[
          user?.userInfo?.books?.booksScored.length - 1
        ]
    )
    bookId = bookId?.map((book) => findBook(book, readBooks))
    for (let i = 0; i < bookId?.length; i++) {
      userBookObj[i] = bookId[i]
    }
    userBookObj = Object.entries(userBookObj)
    return userBookObj
  }
  userData?.length > 0 ? updateBookObj() : null

  return (
    <div className="mx-5 my-5 flex h-[500px] w-[700px] border-4 border-solid border-[var(--default-border-color)] bg-[var(--user-background-color)] max-sm:h-[400px] max-sm:w-[350px] sm:bg-[rgba(244,236,8,0.087)] max-xs:h-[300px] max-xs:w-[250px]">
      <div className="flex w-1/2 flex-col items-center justify-evenly border-r-2 border-solid border-[rgba(0,0,0,0.193)]">
        {decodedToken?._id === user?._id ? (
          <div className="flex">
            <EditUsernameButton inUsername={user?.username} id={user?._id} />
            <h2 className="underline max-sm:text-[2.5rem] max-xs:text-[1.5rem] text-5xl">
              {user?.username}
            </h2>
          </div>
        ) : (
          <h2 className="underline max-sm:text-[2.5rem] max-xs:text-[1.5rem] text-5xl font-main">
            {user?.username}
          </h2>
        )}
        <Link href={`/brothers/library/${user?.username}`}>
          <img
            src={
              user?.userInfo?.profileURL
                ? user?.userInfo?.profileURL
                : ProfileUnknownUserImage.src
            }
            alt="profile_pic"
            className="h-[350px] w-[200px] border-3 border-[var(--default-border-color)] grayscale max-sm:h-[250px] max-sm:w-[125px] sm:border-black"
          />
        </Link>
        {decodedToken?._id === user?._id ? (
          <div className="flex">
            <PictureUploadButton
              id={user?._id}
              inImage={user?.userInfo?.profileURL}
            />
          </div>
        ) : null}
      </div>

      <div className="flex w-1/2 flex-col pl-10 pt-5 max-sm:pl-[25px] max-sm:pt-0">
        <ul>
          <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base max-xs:text-[0.75rem]">
            Location
            {decodedToken?._id === user?._id ? (
              <EditCityAndCountryButton
                id={user?._id}
                inCity={user?.userInfo?.residence?.city}
                inCountry={user?.userInfo?.residence?.country}
              />
            ) : null}
          </li>
          <div className="flex">
            {user?.userInfo?.residence?.city ? (
              <li className="max-xs:text-[0.75rem]">
                City: {user?.userInfo?.residence?.city}
              </li>
            ) : (
              <li className="font-bold text-red-500 max-xs:text-[0.75rem]">
                No city written
              </li>
            )}
          </div>

          <div className="flex">
            {user?.userInfo?.residence?.country ? (
              <li className="max-xs:text-[0.75rem]">
                Country: {user?.userInfo?.residence?.country}
              </li>
            ) : (
              <li className="font-bold text-red-500 max-xs:text-[0.75rem]">
                No country written
              </li>
            )}
          </div>

          <div className="flex">
            <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base max-xs:text-[0.75rem]">
              Favourite Genres
            </li>
            {decodedToken?._id === user?._id ? (
              <EditGenreButton
                inGenre={user?.userInfo?.favGenre?.map((genre) => genre)}
                id={decodedToken?._id}
              />
            ) : null}
          </div>
          {user?.userInfo?.favGenre?.length > 0 ? (
            user?.userInfo?.favGenre?.map((genre) => (
              <>
                <li className="list-disc max-xs:text-[0.75rem]">{genre}</li>
              </>
            ))
          ) : (
            <li className="font-bold text-red-500 max-xs:text-[0.75rem]">
              None selected
            </li>
          )}
          <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base max-xs:text-[0.75rem]">
            Last rating given
          </li>
          <li className="max-xs:text-[0.75rem]">
            Book:{" "}
            {Object.keys(userBookObj).length > 0 ? (
              userBookObj[userData?.indexOf(user)][1]
            ) : (
              <LoaderNoText />
            )}
          </li>
          <li className="max-xs:text-[0.75rem]">
            Score:
            {Object.keys(userBookObj).length !== 0 &&
            handleHideScores_NoSetter(
              findDateOfMeeting(
                userBookObj[userData?.indexOf(user)][1],
                readBooks
              )
            )
              ? " ?"
              : ` ${
                  user?.userInfo?.books?.score[
                    user?.userInfo?.books?.score.length - 1
                  ]
                }`}
          </li>
        </ul>
        <div className="mt-auto mb-5 flex">
          <DoubleLeftOutlined
            className="leftArrow text-2xl max-sm:text-base"
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          />
          <span className="pr-5 text-center max-sm:pr-[5px] max-sm:text-[0.80rem] max-xs:text-[0.55rem]">
            Click the photo on the left to view more details
          </span>
        </div>
      </div>
    </div>
  )
}

export default BrothersProfile
