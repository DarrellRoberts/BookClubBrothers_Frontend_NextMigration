import { useState } from "react"

const useLimit = () => {
  const limitDenominator =
    typeof window !== "undefined"
      ? window.innerWidth > 440
        ? 440
        : window.innerWidth
      : 1

  const limitDefault =
    typeof window !== "undefined"
      ? window?.innerWidth > 440
        ? Math.floor(window.innerWidth / limitDenominator) * 2
        : 6
      : 6

  const [limit, setLimit] = useState<number>(limitDefault)
  const [isLimit, setIsLimit] = useState<boolean>(false)

  const handleLimit = () => {
    if (limit >= 17) return
    setIsLimit(true)
    const extraBooks =
      limitDefault === limit
        ? Math.floor((window.innerWidth * 2) / limitDenominator) + 1
        : 6
    setLimit((n) => n + extraBooks)
  }

  return { handleLimit, limit, isLimit, setIsLimit, setLimit }
}

export default useLimit
