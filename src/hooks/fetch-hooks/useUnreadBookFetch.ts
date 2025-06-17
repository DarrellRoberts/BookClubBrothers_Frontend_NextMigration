"use client"

import { useQuery } from "@tanstack/react-query"

const useBookFetch = (url: string, param: string | null) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["unreadBookData", param],
    queryFn: async () => fetch(url).then((res) => res.json()),
    // staleTime: 1000 * 60 * 5,
  })

  const bookData = data

  const loadingBooks = isPending

  return { bookData, loadingBooks, error }
}

export default useBookFetch
