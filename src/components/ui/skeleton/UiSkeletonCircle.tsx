import React from "react"

type Props = {
  radius?: number
}

export const UiSkeletonCircle = ({ radius = 1 }: Props) => {
  return (
    <div
      style={{ width: radius + "rem" }}
      className={`animate-pulse bg-zinc-500 aspect-square rounded-full`}
    />
  )
}
