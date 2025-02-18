"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import TextInfo from "./components/TextInfo";
import ThreeScene from "./components/ThreeScene";
import Loader from "@/components/loader/Loader";
import { Book } from "@/types/BookInterface";

type Props = {
  readBooks: string[];
  readIds: string[];
  readBooksJson: Book[];
};

export default function Base({ readBooks, readIds, readBooksJson }: Props) {
  const [clicked, setClicked] = useState<boolean>(true);
  const [clickId, setClickId] = useState<string>(null);
  const [token, setToken] = useState<string | null>(null);
  const [renderIds, setRenderIds] = useState<string[]>([]);

  useEffect(() => {
    setRenderIds([...readIds]);
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      {!clicked ? (
        <TextInfo
          // readBooks={readBooks}
          clickId={clickId}
          readBooksJson={readBooksJson}
        />
      ) : null}
      <div className="flex justify-center align-center h-screen">
        {readBooks.length < 0 ? (
          <Loader />
        ) : (
          <ThreeScene
            clicked={clicked}
            setClicked={setClicked}
            setClickId={setClickId}
            setRenderIds={setRenderIds}
            readIds={readIds}
            readBooks={readBooks}
            renderIds={renderIds}
            token={token}
          />
        )}
      </div>
    </>
  );
}
