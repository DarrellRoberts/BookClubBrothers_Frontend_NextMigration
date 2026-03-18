import React from "react"
import { UiSkeletonComment } from "@/components/ui/skeleton/UiSkeletonComment"

const BrotherLoadingCommentCon: React.FC = () => {
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
