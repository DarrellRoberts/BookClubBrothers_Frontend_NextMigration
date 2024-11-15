"use client";
import { useState, useEffect } from "react";
import { type User } from "@/types/UserInterface";

const useSingleUserFetch = (url: string) => {
  const [userData, setUserData] = useState<User>();
  const [error, setError] = useState<string | null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch(url);
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

export default useSingleUserFetch;
