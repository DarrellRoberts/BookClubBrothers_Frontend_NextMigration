"use client"

import { useQuery } from "@tanstack/react-query"
import { TIME_MILLISECONDS } from "../timeVars"

const useBookFetch = <T>(url: string, param: T) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["bookData", param],
    queryFn: async () => fetch(url).then((res) => res.json()),
    staleTime: TIME_MILLISECONDS.ONE_MONTH,
    gcTime: TIME_MILLISECONDS.ONE_MINUTE * 30,
  })

  const bookData = data

  const loadingBooks = isPending

  return { bookData, loadingBooks, error }
}

export default useBookFetch
