"use client"

import { useQuery } from "@tanstack/react-query"

const useSingleUserFetch = (url: string) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["singleUserData"],
    queryFn: async () => fetch(url).then((res) => res.json()),
  })

  const singleUserData = data

  const loadingUser = isPending

  return { singleUserData, loadingUser, error }
}

export default useSingleUserFetch
