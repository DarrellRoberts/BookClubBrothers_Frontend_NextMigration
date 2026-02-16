import Profile from "@/components/misc/profile/Profile"
import { Book } from "@/types/BookInterface"
import { Skeleton } from "antd"
import React from "react"
import useSingleUserFetch from "@/hooks/fetch-hooks/useSingleUserFetch"
import { config } from "@/configs/config"
import { useAppSelector } from "@/store/lib/hooks"

type Props = {
  bookData: Book
}

const SuggestedByIcon = ({ bookData }: Props) => {
  const { singleUserData } = useSingleUserFetch(
    `${config.API_URL}/users/id/${bookData?.suggestedBy}`,
    bookData?.suggestedBy,
  )

  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return bookData ? (
    <div className="flex flex-col items-center justify-center">
      <h2>Suggested by: </h2>
      <Profile
        imageURL={singleUserData?.userInfo?.profileURL}
        width={75}
        height={100}
        isLink={singleUserData?.username?.length > 0}
        username={singleUserData?.username}
      />
      <h2 className="p-0 m-0">{singleUserData?.username}</h2>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-2">
      <h2>Suggested by: </h2>
      <Skeleton.Avatar
        active={true}
        style={{
          filter: isDarkMode ? "invert(1)" : "invert(0)",
          width: 75,
          height: 75,
        }}
      />
      <Skeleton.Input
        active={true}
        size="small"
        style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
      />
    </div>
  )
}

export default SuggestedByIcon
