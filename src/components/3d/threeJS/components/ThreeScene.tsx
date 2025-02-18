/* eslint-disable react/no-unknown-property */
"use client";
import React, { useEffect, useState } from "react";
import Books3D from "./Books3D";
import { Dispatch, SetStateAction, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Scroll, ScrollControls } from "@react-three/drei";
import Loader from "./Loader";
import style from "./3d.module.css";
import HeaderCon3D from "@/components/header/HeaderCon3D";
import DarkMode from "@/components/misc/dark-mode/DarkMode";

interface Props {
  clicked: boolean;
  setClicked: Dispatch<SetStateAction<boolean>>;
  setClickId: Dispatch<SetStateAction<string>>;
  setRenderIds: Dispatch<SetStateAction<string[]>>;
  readIds: string[];
  readBooks: string[];
  renderIds: string[];
  token: string;
}

export default function ThreeScene({
  clicked,
  setClicked,
  setClickId,
  setRenderIds,
  readIds,
  readBooks,
  renderIds,
  token,
}: Props) {
  const [pages, setPages] = useState<number>(renderIds.length);

  useEffect(() => setPages(renderIds.length), [renderIds]);
  console.log(pages);
  return (
    <Canvas camera={{ position: [0, 0, -2.15] }}>
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, -5]} intensity={45} />
      <ScrollControls pages={renderIds.length} damping={0.5}>
        <Suspense fallback={<Loader />}>
          <Books3D
            clicked={clicked}
            setClicked={setClicked}
            setClickId={setClickId}
            setRenderIds={setRenderIds}
            readIds={readIds}
            renderIds={renderIds}
            readBooks={readBooks}
          />
        </Suspense>
        <Scroll html>
          <HeaderCon3D propsToken={token} />
          <h1 className={style.title}>Books 3D Library</h1>
          <div className={style.darkMode}>
            <DarkMode />
          </div>
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
}
