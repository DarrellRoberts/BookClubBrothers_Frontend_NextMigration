/* eslint-disable react/no-unknown-property */
"use client";
import React from "react";
import Books3D from "./Books3D";
import { Dispatch, SetStateAction } from "react";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import style from "../../3d.module.css";

interface Props {
  clicked: boolean;
  setClicked: Dispatch<SetStateAction<boolean>>;
  setClickId: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  readIds: string[];
}

export default function ThreeScene({
  clicked,
  setClicked,
  setClickId,
  setLoading,
  readIds,
}: Props) {
  return (
    <Canvas camera={{ position: [0, 0, -2.15] }}>
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, -5]} intensity={45} />
      <ScrollControls pages={readIds.length} damping={1}>
        <Books3D
          clicked={clicked}
          setClicked={setClicked}
          setClickId={setClickId}
          setLoading={setLoading}
          readIds={readIds}
        />
        <Scroll html>
          <h1 className={style.title}>Books 3D Library</h1>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
