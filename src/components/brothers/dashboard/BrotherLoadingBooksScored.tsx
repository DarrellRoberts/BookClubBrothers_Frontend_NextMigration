import React from "react"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"

const BrotherLoadingBooksScored: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <>
      <div className="flex justify-evenly">
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
        />
        <Skeleton.Avatar
          active={true}
          shape="circle"
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      </div>
      <div className="flex flex-col gap-4 mx-6 mt-4">
        <Skeleton style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }} />
        <Skeleton style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }} />
        <Skeleton style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }} />
      </div>
    </>
  )
}

export default BrotherLoadingBooksScored
