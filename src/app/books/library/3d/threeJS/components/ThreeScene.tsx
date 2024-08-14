"use client";
import React from 'react';
import { Dispatch, SetStateAction } from "react";
import Books3D from './Books3D';

interface Props {
  clicked: boolean,
  setClicked: Dispatch<SetStateAction<boolean>>
  readIds: string[]
}

export default function ThreeScene({clicked, setClicked, readIds}: Props) {
  return (
    <Books3D clicked={clicked} setClicked={setClicked} readIds={readIds}/>
  );
}
