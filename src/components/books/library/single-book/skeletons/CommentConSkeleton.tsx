import { useAppSelector } from "@/store/lib/hooks"
import { Skeleton } from "antd"
import React from "react"

export const CommentConSkeleton = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <div className="flex flex-col items-center my-2">
      <Skeleton.Node
        active={true}
        style={{
          width: 300,
          height: 400,
          filter: isDarkMode ? "invert(1)" : "invert(0)",
        }}
      >
        <Skeleton className="mx-6" />
      </Skeleton.Node>
    </div>
  )
}
