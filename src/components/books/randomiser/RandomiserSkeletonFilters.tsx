import { UiSkeletonCircle } from "@/components/ui/skeleton/UiSkeletonCircle"
import { UiSkeletonTitle } from "@/components/ui/skeleton/UiSkeletonTitle"
import { useAppSelector } from "@/store/lib/hooks"
import { Skeleton } from "antd"
import React, { useMemo } from "react"

type Props = {
  freq: number
}

const RandomiserSkeletonFilters: React.FC<Props> = ({ freq }) => {
  return (
    <>
      {Array.from({ length: freq }).map((_, index) => (
        <div className="flex gap-1 w-35" key={index}>
          <UiSkeletonCircle radius={2} />
          <UiSkeletonTitle height={1.5} width={100} />
        </div>
      ))}
    </>
  )
}

export default RandomiserSkeletonFilters
