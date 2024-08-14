"use client";
import React from 'react';
import { Dispatch, SetStateAction } from "react";

type Props = {
    clicked: boolean,
    setClicked: Dispatch<SetStateAction<boolean>>
    readIds: string[]
}

export default function Books3D({clicked, setClicked, readIds}: Props) {
  console.log(readIds);
  return (
    <div>Books3D</div>
  );
}
