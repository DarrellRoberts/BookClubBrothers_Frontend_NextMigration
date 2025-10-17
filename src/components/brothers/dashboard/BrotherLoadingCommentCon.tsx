/* eslint-disable react/no-unescaped-entities */
import React from "react"
import { Book } from "@/types/BookInterface"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"

const BrotherLoadingCommentCon: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <div className="flex justify-evenly p-4 rounded-lg w-full flex-wrap gap-4">
      <div className="flex flex-col items-center gap-2">
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
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
      <div className="flex flex-col items-center gap-2">
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
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
      <div className="flex flex-col items-center gap-2">
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
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
      <div className="flex flex-col items-center gap-2">
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
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
    </div>
  )
}

export default BrotherLoadingCommentCon
