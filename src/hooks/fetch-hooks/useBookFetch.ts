"use client";
import { useState, useEffect } from "react";
import { type Book } from "@/types/BookInterface";

const useBookFetch = (url: string, searchBar: string | null, read: boolean) => {
  const [bookData, setBookData] = useState<Book[]>([]);
  const [error, setError] = useState<string | null | unknown>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async (): Promise<void> => {
    try {
      const response = searchBar
        ? await fetch(`${url}/title/${searchBar}`)
        : await fetch(url);
      let data = await response.json();
      read ? (data = data.filter((book) => book.read === true)) : data;
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

export default useBookFetch;
