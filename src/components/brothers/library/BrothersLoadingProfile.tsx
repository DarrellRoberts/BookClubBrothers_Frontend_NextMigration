import React from "react"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"

const BrothersLoadingProfile: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <div className="mx-5 my-5 flex h-[500px] w-[700px] border-4 border-solid border-[var(--default-border-color)] bg-[var(--user-background-color)] max-sm:h-[400px] max-sm:w-[350px] sm:bg-[rgba(244,236,8,0.087)] max-xs:h-[300px] max-xs:w-[250px]">
      <div className="flex w-1/2 flex-col items-center justify-evenly">
        <Skeleton.Input
          active={true}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Image
          active={true}
          style={{
            width: 200,
            height: 350,
            filter: isDarkMode ? "invert(1)" : "invert(0)",
          }}
        />
      </div>

      <div className="flex w-1/2 flex-col pl-10 pt-5 max-sm:pl-[25px] max-sm:pt-0">
        <ul>
          <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base max-xs:text-[0.75rem]">
            Location
          </li>
          <div className="flex">
            <li className="max-xs:text-[0.75rem]">
              City:{" "}
              <Skeleton.Input
                active={true}
                size="small"
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            </li>
          </div>

          <div className="flex">
            <li className="max-xs:text-[0.75rem]">
              Country:{" "}
              <Skeleton.Input
                active={true}
                size="small"
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            </li>
          </div>

          <div className="flex">
            <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base max-xs:text-[0.75rem]">
              Favourite Genres
            </li>
          </div>
          <div className="flex gap-2">
            <Skeleton.Avatar
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
            <Skeleton.Input
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </div>
          <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base max-xs:text-[0.75rem]">
            Last rating given
          </li>
          <li className="max-xs:text-[0.75rem]">
            Book:{" "}
            <Skeleton.Input
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </li>
          <li className="max-xs:text-[0.75rem]">
            Score:{" "}
            <Skeleton.Input
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BrothersLoadingProfile
