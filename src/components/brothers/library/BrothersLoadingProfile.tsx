import React from "react"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import { useMediaQuery } from "react-responsive"

const BrothersLoadingProfile: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  const handleDesktop = useMediaQuery({ query: "(min-device-width: 640px)" })
  return (
    <div className="mx-5 my-5 flex h-[500px] w-[700px] max-md:w-[500px] border-4 border-solid border-[var(--default-border-color)] bg-[var(--user-background-color)] max-sm:h-[400px] max-sm:w-[250px] max-xs:h-[300px]">
      <div className="flex min-sm:w-1/2 flex-col items-center justify-evenly">
        <Skeleton.Input
          active={true}
          size={handleDesktop ? "large" : "small"}
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Image
          active={true}
          style={{
            width: handleDesktop ? 200 : 100,
            height: handleDesktop ? 350 : 300,
            filter: isDarkMode ? "invert(1)" : "invert(0)",
          }}
        />
      </div>

      <div className="flex min-sm:w-1/2 flex-col min-sm:pl-10 pt-5 max-sm:pt-0">
        <ul>
          <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base ">
            Location
          </li>
          <div className="flex">
            <li className="">
              City:{" "}
              <Skeleton.Input
                active={true}
                size="small"
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            </li>
          </div>

          <div className="flex">
            <li>
              Country:{" "}
              <Skeleton.Input
                active={true}
                size="small"
                style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
              />
            </li>
          </div>

          <div>
            <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base ">
              Favourite Genres
            </li>
          </div>
          <div>
            <Skeleton.Input
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </div>
          <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base ">
            Last rating given
          </li>
          <li>
            Book:{" "}
            <Skeleton.Input
              active={true}
              size="small"
              style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
            />
          </li>
          <li>
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
