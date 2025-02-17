import Link from "next/link";
import React from "react";
import LoaderNoText from "@/components/loader/LoaderNoText";
import { DoubleLeftOutlined } from "@ant-design/icons";
import PictureUploadButton from "@/components/forms/brotherform/PictureUploadButton";
import EditUsernameButton from "@/components/forms/brotherform/EditUsernameButton";
import EditCityAndCountryButton from "@/components/forms/brotherform/EditCityAndCountryButton";
import EditGenreButton from "@/components/forms/brotherform/EditGenreButton";
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores";
import { findBook, findDateOfMeeting } from "@/utils/find-functions/find";
import { User } from "@/types/UserInterface";
import ProfileUnknownUserImage from "@/assets/Profile.unknown-profile-image.jpg";
import { Book } from "@/types/BookInterface";
import "@/style/brothercat.css";
import "@/style/brothercatRes.css";
import { useAuth } from "@/hooks/auth-hooks/useAuth";

type Props = {
  user: User;
  userData: User[];
  readBooks: Book[];
};

const BrothersProfile: React.FC<Props> = ({ user, readBooks, userData }) => {
  const { decodedToken } = useAuth();

  let userBookObj = {};

  const updateBookObj = () => {
    if (userData.length === 0) return [];
    let bookId = userData?.map(
      (user) =>
        user?.userInfo?.books?.booksScored[
          user?.userInfo?.books?.booksScored.length - 1
        ]
    );
    bookId = bookId?.map((book) => findBook(book, readBooks));
    for (let i = 0; i < bookId?.length; i++) {
      userBookObj[i] = bookId[i];
    }
    userBookObj = Object.entries(userBookObj);
    return userBookObj;
  };
  userData?.length > 0 ? updateBookObj() : null;

  return (
    <div className="brotherBook border-4 border-solid m-5 flex">
      <div className="brotherBookLeft flex flex-col justify-evenly items-center">
        {decodedToken?._id === user?._id ? (
          <div className="flex">
            <EditUsernameButton inUsername={user?.username} id={user?._id} />
            <h2 className="text-black underline">{user?.username}</h2>
          </div>
        ) : (
          <h2 className="text-black underline">{user?.username}</h2>
        )}
        <Link href={`/brothers/library/${user?.username}`}>
          <img
            src={
              user?.userInfo?.profileURL
                ? user?.userInfo?.profileURL
                : ProfileUnknownUserImage.src
            }
            alt="profile_pic"
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

      <div className="brotherBookRight flex flex-col pl-10 pt-5">
        <ul>
          <li className="brotherList underline pt-5">
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
              <li>City: {user?.userInfo?.residence?.city}</li>
            ) : (
              <li className="text-red-500 font-bold">No city written</li>
            )}
          </div>

          <div className="flex">
            {user?.userInfo?.residence?.country ? (
              <li>Country: {user?.userInfo?.residence?.country}</li>
            ) : (
              <li className="text-red-500 font-bold">No country written</li>
            )}
          </div>

          <div className="flex">
            <li className="brotherList underline pt-5">Favourite Genres</li>
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
                <li className="list-disc">{genre}</li>
              </>
            ))
          ) : (
            <li className="text-red-500 font-bold">None selected</li>
          )}
          <li className="brotherList underline pt-5">Last rating given</li>
          <li>
            Book:{" "}
            {Object.keys(userBookObj).length > 0 ? (
              userBookObj[userData?.indexOf(user)][1]
            ) : (
              <LoaderNoText />
            )}
          </li>
          <li>
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
        <div className="clickPhotoCon mt-auto mb-5 flex">
          <DoubleLeftOutlined className="leftArrow text-2xl" />
          <span className="clickPhoto">
            Click the photo on the left to view more details
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrothersProfile;
