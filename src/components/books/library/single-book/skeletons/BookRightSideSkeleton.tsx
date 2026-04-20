import { useAppSelector } from "@/store/lib/hooks"
import { Skeleton } from "antd"

export const BookRightSideSkeleton = () => {
      const isDarkMode = useAppSelector((state) => state.darkMode.darkMode)
  return (
    <div>
      <Skeleton.Input
        active={true}
        style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
      />
      <Skeleton.Input
        active={true}
        style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
      />
      <Skeleton.Input
        active={true}
        style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
      />
      <Skeleton.Input
        active={true}
        style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
      />
      <Skeleton.Input
        active={true}
        style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
      />
      <Skeleton.Input
        active={true}
        style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
      />
      <Skeleton.Input
        active={true}
        style={{ filter: isDarkMode ? "invert(1)" : "invert(0)" }}
      />
    </div>
  )
}
