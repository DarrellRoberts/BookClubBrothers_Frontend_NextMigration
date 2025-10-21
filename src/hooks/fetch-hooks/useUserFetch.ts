"use client"

import { useQuery } from "@tanstack/react-query"
import { TIME_MILLISECONDS } from "../timeVars"

const useUserFetch = (url: string, searchBar: string | null) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["userData", searchBar],
    queryFn: async () => fetch(url).then((res) => res.json()),
    staleTime: TIME_MILLISECONDS.ONE_MONTH,
    gcTime: TIME_MILLISECONDS.ONE_MINUTE * 30,
  })

  const userData = data

  const loadingUsers = isPending

  return { userData, loadingUsers, error }
}

export default useUserFetch
