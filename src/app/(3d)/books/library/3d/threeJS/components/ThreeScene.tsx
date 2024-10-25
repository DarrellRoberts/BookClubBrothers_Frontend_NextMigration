/* eslint-disable react/no-unknown-property */
"use client";
import React from "react";
import Books3D from "./Books3D";
import { Dispatch, SetStateAction, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Loader from "./Loader";
import style from "../../../../../3d.module.css";
import HeaderCon from "@/components/header/HeaderCon";

interface Props {
  clicked: boolean;
  setClicked: Dispatch<SetStateAction<boolean>>;
  setClickId: Dispatch<SetStateAction<string>>;
  readIds: string[];
  token: string;
}

export default function ThreeScene({
  clicked,
  setClicked,
  setClickId,
  readIds,
  token,
}: Props) {
  return (
    <Canvas camera={{ position: [0, 0, -2.15] }}>
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, -5]} intensity={45} />
      <ScrollControls pages={readIds.length} damping={0.5}>
        <Suspense fallback={<Loader />}>
          <Books3D
            clicked={clicked}
            setClicked={setClicked}
            setClickId={setClickId}
            readIds={readIds}
          />
        </Suspense>
        <Scroll html>
          <HeaderCon propsToken={token} />
          <h1 className={style.title}>Books 3D Library</h1>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
