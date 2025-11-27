import React, { useMemo } from "react"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import { useMediaQuery } from "react-responsive"

type Props = {
  freq: number
  noTitle?: boolean
}

const BookSkeleton = ({ freq, noTitle }: Props) => {
  const handleDesktop = useMediaQuery({ query: "(min-device-width: 601px)" })
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)

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
                width: handleDesktop ? 375 : 285,
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

export default React.memo(BookSkeleton)
