import React from "react"

type Props = {
  width: number
}

export const UiSkeletonImage = ({ width }) => {
  return (
    <div
      style={{ width: width + "%" }}
      className="animate-pulse w-75 h-65 max-xs:w-50 max-xs:h-55 bg-zinc-500 rounded-2xl"
    />
  )
}
