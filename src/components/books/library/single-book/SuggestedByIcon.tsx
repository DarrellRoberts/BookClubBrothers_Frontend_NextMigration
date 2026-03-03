import Profile from "@/components/misc/profile/Profile"
import { Book } from "@/types/BookInterface"
import { Skeleton } from "antd"
import React from "react"
import { API_SINGLE_USER, config } from "@/configs/config"
import { useAppSelector } from "@/store/lib/hooks"
import { useGetQuery } from "@/hooks/fetch-hooks/useGetQuery"
import { User } from "@/types/UserInterface"

type Props = {
  bookData: Book
}

const SuggestedByIcon = ({ bookData }: Props) => {
  const userId = bookData?.suggestedBy

  const { data: singleUserData, isLoading } = useGetQuery<User>({
    queryKey: ["users", userId],
    apiPath: `${API_SINGLE_USER}${userId}`,
  })

  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return bookData && !isLoading ? (
    <div className="flex flex-col items-center justify-center">
      <h2>Suggested by: </h2>
      <Profile
        imageURL={
          singleUserData?.userInfo?.profileURL ||
          "/Profile.unknown-profile-image.jpg"
        }
        width={100}
        height={200}
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
