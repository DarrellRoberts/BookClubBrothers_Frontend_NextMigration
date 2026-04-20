import { useAppSelector } from "@/store/lib/hooks"
import { Skeleton } from "antd"

export const RatingConSkeleton = () => {
  const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-2">
        <Skeleton.Input
          active={true}
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Input
          active={true}
          size="large"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton.Input
          active={true}
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Input
          active={true}
          size="large"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton.Input
          active={true}
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Input
          active={true}
          size="large"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton.Input
          active={true}
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Input
          active={true}
          size="large"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton.Input
          active={true}
          size="small"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
        <Skeleton.Input
          active={true}
          size="large"
          style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
        />
      </div>
    </div>
  )
}
