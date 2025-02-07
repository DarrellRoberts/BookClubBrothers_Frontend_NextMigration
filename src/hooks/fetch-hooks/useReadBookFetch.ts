"use client";

import { useQuery } from "@tanstack/react-query";

const useBookFetch = <T>(url: string, param: T) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["bookData", param],
    queryFn: async () => fetch(url).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const bookData = data;

  const loadingBooks = isPending;

  return { bookData, loadingBooks, error };
};

export default useBookFetch;
