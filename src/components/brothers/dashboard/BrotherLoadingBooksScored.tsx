import Filters from "@/components/graphs/brothers/Filters"
import Graph from "@/components/graphs/brothers/Graph"
import LoaderNoText from "@/components/loader/LoaderNoText"
import { filterUserReadBooks } from "@/utils/stat-functions/scoreFunctions"
import { handleHideScores_NoSetter } from "@/utils/time-functions/hideScores"
import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"
import React, { useEffect, useState } from "react"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"

const BrotherLoadingBooksScored: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <>
      <div className="flex justify-evenly">
        <Skeleton.Avatar
          active={true}
          shape="circle"
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Avatar
          active={true}
          shape="circle"
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Avatar
          active={true}
          shape="circle"
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Avatar
          active={true}
          shape="circle"
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      </div>
      <div className="flex flex-col gap-4 mx-6 mt-4">
        <Skeleton style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }} />
        <Skeleton style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }} />
        <Skeleton style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }} />
      </div>
    </>
  )
}

export default BrotherLoadingBooksScored
