import React from "react"

type Props = {
  height: number
  width: number
}

export const UiSkeletonTitle = ({ height, width }) => {
  return (
    <div
      style={{ height: height + "rem", width: width + "%" }}
      className="animate-pulse bg-zinc-500 rounded-2xl"
    />
  )
}
