"use client";
import React from "react";
import { useState } from "react";
import TextInfo from "./components/TextInfo";
import ThreeScene from "./components/ThreeScene";

type Props = {
  readBooks: object[],
  readIds: string []
}

export default function Base({ readBooks, readIds }: Props) {
  const [clicked, setClicked] = useState<boolean>(true);
  return (
    <>
      <div className="flex justify-center align-center h-screen">
        {!clicked ? <TextInfo readBooks={readBooks} /> : null}
        <ThreeScene clicked={clicked} setClicked={setClicked} readIds={readIds} />
      </div>
    </>
  );
}
