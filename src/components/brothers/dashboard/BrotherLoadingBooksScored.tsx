import React from "react"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import { UiSkeletonText } from "@/components/ui/skeleton/UiSkeletonText"
import { UiSkeletonCircle } from "@/components/ui/skeleton/UiSkeletonCircle"

const BrotherLoadingBooksScored: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <>
      <div className="flex justify-evenly">
        <UiSkeletonCircle radius={1.5} />
        <UiSkeletonCircle radius={1.5} />
        <UiSkeletonCircle radius={1.5} />
        <UiSkeletonCircle radius={1.5} />

        {/* <Skeleton.Avatar
          active={true}
          shape="circle"
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Avatar
          active={true}
          shape="circle"
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Avatar
          active={true}
          shape="circle"
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Avatar
          active={true}
          shape="circle"
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        /> */}
      </div>

      <div className="flex flex-col gap-4 mx-6 mt-4">
        <UiSkeletonText />
        <UiSkeletonText />
        <UiSkeletonText />
        {/* <Skeleton
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        /> */}
      </div>
    </>
  )
}

export default BrotherLoadingBooksScored
