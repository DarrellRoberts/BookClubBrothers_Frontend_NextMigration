import React from "react"
import { Skeleton } from "antd"
import { useAppSelector } from "@/store/lib/hooks"
import { useMediaQuery } from "react-responsive"
import { UiSkeletonTitle } from "@/components/ui/skeleton/UiSkeletonTitle"
import { UiSkeletonImage } from "@/components/ui/skeleton/UiSkeletonImage"

const BrothersLoadingProfile: React.FC = () => {
  return (
    <div className="mx-5 my-5 flex h-[500px] w-[700px] max-md:w-[500px] border-4 border-solid border-[var(--default-border-color)] bg-[var(--user-background-color)] max-sm:h-[400px] max-sm:w-[250px] max-xs:h-[300px]">
      <div className="flex min-sm:w-1/2 flex-col items-center justify-evenly w-50">
        <UiSkeletonTitle height={3} width={75} />
        <UiSkeletonImage width={75} />
      </div>

      <div className="flex min-sm:w-1/2 flex-col min-sm:pl-10 pt-5 max-sm:pt-0">
        <ul>
          <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base ">
            Location
          </li>
          <div>
            <li className="">
              City:
              <UiSkeletonTitle height={1.5} width={50} />
            </li>
          </div>

          <div>
            <li>
              Country:
              <UiSkeletonTitle height={1.5} width={50} />
            </li>
          </div>

          <div>
            <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base ">
              Favourite Genres
            </li>
          </div>
          <UiSkeletonTitle height={1.5} width={50} />
          <li className="underline pt-5 text-xl max-sm:pt-[15px] max-sm:text-base ">
            Last rating given
          </li>
          <li>
            Book: <UiSkeletonTitle height={1.5} width={50} />
          </li>
          <li>
            Score: <UiSkeletonTitle height={1.5} width={50} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default BrothersLoadingProfile
