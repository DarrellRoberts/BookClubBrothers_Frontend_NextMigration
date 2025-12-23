import React, { useMemo } from "react"
import { UiSkeletonCover } from "@/components/ui/skeleton/UiSkeletonCover"
import { UiSkeletonTitle } from "@/components/ui/skeleton/UiSkeletonTitle"

type Props = {
  freq: number
  noTitle?: boolean
}

const BookSkeleton = ({ freq, noTitle }: Props) => {
  const skeletonArray = useMemo(() => {
    const newArr = new Array()
    newArr.length = freq
    newArr.fill(1)
    return newArr.map((_, index) => index * freq)
  }, [freq])

  return (
    <div className="min-md:ml-4 flex flex-wrap gap-6 max-md:flex-col max-md:items-center">
      {skeletonArray?.map((node) => (
        <div className="flex flex-col items-center gap-1" key={node}>
          {!noTitle && <UiSkeletonTitle height={2.25} width={75} />}
          <UiSkeletonCover />
        </div>
      ))}
    </div>
  )
}

export default React.memo(BookSkeleton)
