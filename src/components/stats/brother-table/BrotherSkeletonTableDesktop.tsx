import React, { useMemo } from "react"
import styles from "./stats.module.css"
import { UiSkeletonTitle } from "@/components/ui/skeleton/UiSkeletonTitle"

const BrotherSkeletonTableDesktop: React.FC = () => {
  const skeletonArray = useMemo(() => Array.from({ length: 5 }), [])
  return (
    <>
      <div className={styles.leagueTable}>
        <div className="border-r-2 border-black border-dashed pr-5">
          <h2 className="underline">Username</h2>
          <div className="flex flex-col gap-4 mb-2">
            {skeletonArray.map((_, index) => (
              <UiSkeletonTitle
                height={1.5}
                width={75}
                key={`username-row-${index}`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="underline">Books read</h2>
          <div className="flex flex-col gap-4 mb-2">
            {skeletonArray.map((_, index) => (
              <UiSkeletonTitle
                height={1.5}
                width={75}
                key={`books-read-row-${index}`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="underline">Highest Score</h2>
          <div className="flex flex-col gap-4 mb-2">
            {skeletonArray.map((_, index) => (
              <UiSkeletonTitle
                height={1.5}
                width={75}
                key={`highest-score-row-${index}`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="underline">Lowest Score</h2>
          <div className="flex flex-col gap-4 mb-2">
            {skeletonArray.map((_, index) => (
              <UiSkeletonTitle
                height={1.5}
                width={75}
                key={`lowest-score-row-${index}`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="underline">Best Book</h2>
          <div className="flex flex-col gap-4 mb-2">
            {skeletonArray.map((_, index) => (
              <UiSkeletonTitle
                height={1.5}
                width={75}
                key={`best-book-row-${index}`}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="underline">Worst Book</h2>
          <div className="flex flex-col gap-4 mb-2">
            {skeletonArray.map((_, index) => (
              <UiSkeletonTitle
                height={1.5}
                width={75}
                key={`worst-book-row-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BrotherSkeletonTableDesktop
