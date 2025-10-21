"use client"

import { useQuery } from "@tanstack/react-query"
import { TIME_MILLISECONDS } from "../timeVars"

const useSingleUserFetch = (url: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["singleUserData"],
    queryFn: async () => fetch(url).then((res) => res.json()),
    staleTime: TIME_MILLISECONDS.ONE_MONTH,
    gcTime: TIME_MILLISECONDS.ONE_MINUTE * 30,
  })

  const singleUserData = data

  const loadingUser = isPending

  return { singleUserData, loadingUser, error }
}

export default useSingleUserFetch
