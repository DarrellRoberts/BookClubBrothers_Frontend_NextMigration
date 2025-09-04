import BookSkeleton from "@/components/books/library/BookSkeleton"
import { useAppSelector } from "@/store/lib/hooks"
import { Button, Skeleton } from "antd"
import React from "react"

const BrotherLoadingBanner = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <>
      <div className="flex flex-col min-md:flex-row items-start max-md:items-center justify-between mt-4 max-md:space-y-4">
        <div className="flex flex-col max-md:items-center">
          <Skeleton.Input
            active={true}
            className="m-5"
            size="large"
            style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
          />
          <Skeleton.Input
            active={true}
            size="small"
            className="ml-0 md:ml-12"
            style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
          />
        </div>

        <div className="flex flex-col items-center max-md:mb-4 max-md:mr-0">
          <h2 className="font-main text-4xl max-sm:text-3xl underline text-center mb-2">
            Achievements
          </h2>
          <div className="flex gap-2">
            <Skeleton.Avatar
              active={true}
              shape="circle"
              size="large"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
            <Skeleton.Avatar
              active={true}
              shape="circle"
              size="large"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
            <Skeleton.Avatar
              active={true}
              shape="circle"
              size="large"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
            <Skeleton.Avatar
              active={true}
              shape="circle"
              size="large"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center mr-0 md:mr-8 max-md:mr-0">
          <div className="flex flex-col items-center">
            <Skeleton.Image
              active={true}
              style={{
                width: 250,
                height: 300,
                filter: isDarkMode ? "invert(1)" : "invert(0)",
              }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8 overflow-hidden max-md:flex max-md:flex-col max-md:items-center my-6">
        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Worst book</h2>
          <div className="w-96 max-sm:w-75 max-xs:w-70">
            <BookSkeleton freq={1} noTitle={true} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Best book</h2>
          <div className="w-96 max-sm:w-75 max-xs:w-70">
            <BookSkeleton freq={1} noTitle={true} />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Books read</h2>
          <div className="flex justify-center h-full">
            <Skeleton.Avatar
              active={true}
              shape="circle"
              size="large"
              style={{
                width: 275,
                height: 275,
                filter: isDarkMode ? "invert(1)" : "invert(0)",
              }}
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h2 className="font-main text-2xl underline">Average Score</h2>
          <Skeleton.Avatar
            active={true}
            shape="circle"
            size="large"
            style={{
              width: 275,
              height: 275,
              filter: isDarkMode ? "invert(1)" : "invert(0)",
            }}
          />
        </div>
      </div>

      <div className="flex justify-evenly w-full">
        <Button href="/books" color="primary" size="large">
          Books
        </Button>
        <Button href="/brothers" color="default" size="large">
          Brothers
        </Button>
      </div>
    </>
  )
}

export default BrotherLoadingBanner
