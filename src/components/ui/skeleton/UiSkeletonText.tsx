import React from "react"

export const UiSkeletonText = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="animate-pulse w-3/4 h-5 bg-zinc-500 rounded-2xl" />
      <div className="animate-pulse w-1/2 h-5 bg-zinc-500 rounded-2xl" />
      <div className="animate-pulse w-1/4 h-5 bg-zinc-500 rounded-2xl" />
    </div>
  )
}
