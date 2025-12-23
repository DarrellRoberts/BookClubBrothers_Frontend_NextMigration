import BookSkeleton from "@/components/books/library/BookSkeleton"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiSkeletonCircle } from "@/components/ui/skeleton/UiSkeletonCircle"
import { UiSkeletonImage } from "@/components/ui/skeleton/UiSkeletonImage"
import { UiSkeletonTitle } from "@/components/ui/skeleton/UiSkeletonTitle"
import React from "react"

const BrotherLoadingBanner = () => {
  return (
    <>
      <div className="flex flex-col min-md:flex-row items-start max-md:items-center justify-between mt-4 max-md:space-y-4">
        <div className="flex flex-col max-md:items-center w-70 gap-5 min-sm:ml-5">
          <UiSkeletonTitle height={5} width={100} />
          <UiSkeletonTitle height={1.5} width={50} />
        </div>

        <div className="flex flex-col items-center max-md:mb-4 max-md:mr-0">
          <h2 className="font-main text-4xl max-sm:text-3xl underline text-center mb-2">
            Achievements
          </h2>
          <div className="flex gap-2">
            <UiSkeletonCircle radius={2.25} />
            <UiSkeletonCircle radius={2.25} />
            <UiSkeletonCircle radius={2.25} />
            <UiSkeletonCircle radius={2.25} />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center mr-0 md:mr-8 max-md:mr-0">
          <div className="flex flex-col items-center w-50">
            <UiSkeletonImage width={100} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 overflow-hidden max-md:flex max-md:flex-col max-md:items-center my-6">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Worst book</h2>
          <BookSkeleton freq={1} noTitle={true} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Best book</h2>
          <BookSkeleton freq={1} noTitle={true} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Books read</h2>
          <UiSkeletonCircle radius={15} />
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Average Score</h2>
          <UiSkeletonCircle radius={15} />
        </div>
      </div>

      <div className="flex justify-evenly w-full">
        <UiButton href="/books" isLink textContent="Book" />
        <UiButton href="/brothers" isLink textContent="Brothers" />
      </div>
    </>
  )
}

export default BrotherLoadingBanner
