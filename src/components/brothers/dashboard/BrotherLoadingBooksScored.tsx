import React from "react"
import { UiSkeletonText } from "@/components/ui/skeleton/UiSkeletonText"
import { UiSkeletonCircle } from "@/components/ui/skeleton/UiSkeletonCircle"

const BrotherLoadingBooksScored: React.FC = () => {
  return (
    <>
      <div className="flex justify-evenly">
        <UiSkeletonCircle radius={1.5} />
        <UiSkeletonCircle radius={1.5} />
        <UiSkeletonCircle radius={1.5} />
        <UiSkeletonCircle radius={1.5} />
      </div>

      <div className="flex flex-col gap-4 mx-6 mt-4">
        <UiSkeletonText />
        <UiSkeletonText />
        <UiSkeletonText />
      </div>
    </>
  )
}

export default BrotherLoadingBooksScored
