import { useAppSelector } from "@/store/lib/hooks"
import { Skeleton } from "antd"
import React, { useMemo } from "react"

type Props = {
  freq: number
}

const RandomiserSkeletonFilters: React.FC<Props> = ({ freq }) => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

  const skeletonArray = useMemo(() => {
    const newArr = new Array()
    newArr.length = freq
    newArr.fill(1)
    return newArr.map((_, index) => index * freq)
  }, [freq])
  return (
    <>
      {skeletonArray?.map((node) => (
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
      ))}
    </>
  )
}

export default RandomiserSkeletonFilters
