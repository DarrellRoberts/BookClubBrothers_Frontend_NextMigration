"use client";
import React from "react";
import { useState } from "react";
import TextInfo from "./components/TextInfo";
import ThreeScene from "./components/ThreeScene";
import Loader from "@/components/loader/Loader";

type Props = {
  readBooks: [
    {
      _id: string;
      title: string;
      pages: number;
      author: string;
      yearPublished: number;
      totalScore: number;
    }
  ];
  readIds: string[];
};

export default function Base({ readBooks, readIds }: Props) {
  const [clicked, setClicked] = useState<boolean>(true);
  const [clickId, setClickId] = useState<string>(null);

  return (
    <>
      {!clicked ? <TextInfo readBooks={readBooks} clickId={clickId} /> : null}
      <div className="flex justify-center align-center h-screen">
        {readBooks.length < 0 ? (
          <Loader />
        ) : (
          <ThreeScene
            clicked={clicked}
            setClicked={setClicked}
            setClickId={setClickId}
            readIds={readIds}
          />
        )}
      </div>
    </>
  );
}
