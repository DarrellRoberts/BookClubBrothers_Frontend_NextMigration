"use client";
import { useState, useEffect } from "react";
import { type Book } from "@/types/BookInterface";

const useSingleBookFetch = (url: string) => {
  const [bookData, setBookData] = useState<Book>();
  const [error, setError] = useState<string | null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBookData(data);
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

  return { bookData, error, loading };
};

export default useSingleBookFetch;
