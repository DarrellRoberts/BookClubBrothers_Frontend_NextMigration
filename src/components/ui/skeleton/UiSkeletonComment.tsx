import React from "react"
import { UiSkeletonTitle } from "./UiSkeletonTitle"

export const UiSkeletonComment = (props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <UiSkeletonTitle height={2} width={75} />
      <div className="animate-pulse w-75 h-65 max-xs:w-50 max-xs:h-55 bg-zinc-500 rounded-2xl" />
    </div>
  )
}
