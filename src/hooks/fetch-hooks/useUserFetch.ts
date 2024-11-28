"use client";

import { useQuery } from "@tanstack/react-query";

const useUserFetch = (url: string, searchBar: string | null) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["userData", searchBar],
    queryFn: async () => fetch(url).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const userData = data;

  const loadingUsers = isPending;

  return { userData, loadingUsers, error };
};

export default useUserFetch;
