/* eslint-disable no-unsafe-optional-chaining */
import React from "react"
import styles from "./stats.module.css"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"

const BrotherSkeletonTableTablet: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  const newArr = new Array()
  newArr.length = 5
  newArr.fill(1.1).forEach((_, index) => index * 5)
  return (
    <>
      <div className={styles.leagueTableTwo}>
        <div className="border-r-2 border-black border-dashed pr-5">
          <h2 className="underline">Username</h2>
          <div className="flex flex-col gap-4 mb-2">
            {newArr.map((node) => (
              <Skeleton.Input
                key={node}
                active={true}
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="underline">Books read</h2>
          <div className="flex flex-col gap-4 mb-2">
            {newArr.map((node) => (
              <Skeleton.Input
                key={node}
                active={true}
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.leagueTableTwo}>
        <div className="border-r-2 border-black border-dashed pr-5">
          <h2 className="underline">Username</h2>
          <div className="flex flex-col gap-4 mb-2">
            {newArr.map((node) => (
              <Skeleton.Input
                key={node}
                active={true}
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="underline">Highest Score</h2>
          <div className="flex flex-col gap-4 mb-2">
            {newArr.map((node) => (
              <Skeleton.Input
                key={node}
                active={true}
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.leagueTableTwo}>
        <div className="border-r-2 border-black border-dashed pr-5">
          <h2 className="underline">Username</h2>
          <div className="flex flex-col gap-4 mb-2">
            {newArr.map((node) => (
              <Skeleton.Input
                key={node}
                active={true}
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="underline">Lowest Score</h2>
          <div className="flex flex-col gap-4 mb-2">
            {newArr.map((node) => (
              <Skeleton.Input
                key={node}
                active={true}
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.leagueTableTwo}>
        <div className="border-r-2 border-black border-dashed pr-5">
          <h2 className="underline">Username</h2>
          <div className="flex flex-col gap-4 mb-2">
            {newArr.map((node) => (
              <Skeleton.Input
                key={node}
                active={true}
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="underline">Best Book</h2>
          <div className="flex flex-col gap-4 mb-2">
            {newArr.map((node) => (
              <Skeleton.Input
                key={node}
                active={true}
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className={styles.leagueTableTwo}>
        <div className="border-r-2 border-black border-dashed pr-5">
          <h2 className="underline">Username</h2>
          <div className="flex flex-col gap-4 mb-2">
            {newArr.map((node) => (
              <Skeleton.Input
                key={node}
                active={true}
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            ))}
          </div>
        </div>
        <div>
          <h2 className="underline">Worst Book</h2>
          <div className="flex flex-col gap-4 mb-2">
            {newArr.map((node) => (
              <Skeleton.Input
                key={node}
                active={true}
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BrotherSkeletonTableTablet
