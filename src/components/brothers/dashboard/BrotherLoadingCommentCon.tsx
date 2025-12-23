import React from "react"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import { UiSkeletonComment } from "@/components/ui/skeleton/UiSkeletonComment"

const BrotherLoadingCommentCon: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <div className="flex justify-evenly p-4 rounded-lg w-full flex-wrap gap-4">
      <div className="flex justify-evenly gap-5">
        <UiSkeletonComment />
        <UiSkeletonComment />
        <UiSkeletonComment />
        <UiSkeletonComment />
      </div>
    </div>
  )
}

export default BrotherLoadingCommentCon
