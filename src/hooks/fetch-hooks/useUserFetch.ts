"use client";
import { useState, useEffect } from "react";
import { type User } from "@/types/UserInterface";

const useUserFetch = (url: string, searchBar: string | null) => {
  const [userData, setUserData] = useState<User[]>([]);
  const [error, setError] = useState<string | null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      const response = searchBar
        ? await fetch(`${url}/username/${searchBar}`)
        : await fetch(url, {cache: "force-cache"});
      const data = await response.json();
      setUserData(data);
      setLoading(false);
    } catch (err: unknown) {
      setLoading(false);
      setError(err);
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { userData, error, loading };
};

export default useUserFetch;
