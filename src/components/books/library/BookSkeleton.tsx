import React from "react"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import { useMediaQuery } from "react-responsive"

type Props = {
  freq: number
  noTitle?: boolean
}

const BookSkeleton: React.FC<Props> = ({ freq, noTitle }) => {
  const handleDesktop = useMediaQuery({ query: "(min-device-width: 601px)" })
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

  const newArr = new Array()
  newArr.length = freq
  newArr.fill(1.1).forEach((_, index) => index * freq)

  return (
    <div className="flex flex-wrap justify-evenly w-full gap-6">
      {newArr.map((node) => (
        <div className="flex flex-col items-center gap-1" key={node}>
          {noTitle ? null : (
            <Skeleton.Input
              active={true}
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          )}
          <div className="border-5 border-solid border-[var(--default-border-color)]">
            <Skeleton.Node
              active={true}
              style={{
                width: handleDesktop ? 375 : 300,
                height: 250,
                filter: isDarkMode ? "invert(1)" : "invert(0)",
              }}
            >
              <div></div>
            </Skeleton.Node>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookSkeleton
