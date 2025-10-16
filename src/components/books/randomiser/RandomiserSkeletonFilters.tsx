import { useAppSelector } from "@/store/lib/hooks"
import { Skeleton } from "antd"
import React from "react"

type Props = {
  freq: number
}

const RandomiserSkeletonFilters: React.FC<Props> = ({ freq }) => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

  const newArr = new Array()
  newArr.length = freq
  newArr.fill(1.1).forEach((_, index) => index * freq)
  return newArr?.map((node) => (
    <div className="flex gap-1" key={node}>
      <Skeleton.Avatar
        active={true}
        size="small"
        style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
      />
      <Skeleton.Input
        active={true}
        size="small"
        style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
      />
    </div>
  ))
}

export default RandomiserSkeletonFilters
