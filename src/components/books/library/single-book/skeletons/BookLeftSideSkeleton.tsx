import { Skeleton } from "antd"
import BookSkeleton from "../../BookSkeleton"
import { useAppSelector } from "@/store/lib/hooks"

export const BookLeftSideSkeleton = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <div className="flex flex-col items-center gap-4 w-full mt-4">
      <Skeleton.Input
        active={true}
        size="large"
        style={{
          filter: isDarkMode ? "invert(1)" : "invert(0)",
        }}
      />
      <div className="">
        <BookSkeleton freq={1} noTitle />
      </div>
    </div>
  )
}
