/* eslint-disable for-direction */
/* eslint-disable react/no-unknown-property */
"use client";
import React from "react";
import {
  useRef,
  useLayoutEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Mesh, Group } from "three";
import { useScroll } from "@react-three/drei";
import gsap from "gsap";

type Props = {
  clicked: boolean;
  setClicked: Dispatch<SetStateAction<boolean>>;
  setClickId: Dispatch<SetStateAction<string>>;
  readIds: string[];
};

type Book = {
  scene: object;
};

export default function Books3D({
  clicked,
  setClicked,
  setClickId,
  readIds,
}: Props) {
  const [showTablet, setShowTablet] = useState<boolean>(false);
  const [showMobile, setShowMobile] = useState<boolean>(false);

  const FLOOR_HEIGHT: number = readIds.length / 2.5;
  const NB_FLOORS: number = readIds.length / 2.5;

  const GLTFLoader =
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("three/examples/jsm/loaders/GLTFLoader").GLTFLoader;
  const mesh = useRef<Mesh>(null!);
  const tl = useRef<GSAPTimeline>(null!);
  const group = useRef<Group>(null!);
  const scroll = useScroll();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  const gsapFunc = () => {
    tl.current = gsap.timeline();
    tl.current.to(
      group.current.position,
      {
        duration: 2,
        y: FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0
    );
  };

  const handleClick = (e) => {
    setClicked(!clicked);
    setClickId(e.eventObject.name);
    gsap.to(e.eventObject.rotation, {
      x: clicked ? 5 : 0,
      y: clicked ? 3.5 : 4.75,
      z: clicked ? -0.5 : 0.45,
      duration: 1,
    });
    gsap.to(e.eventObject.position, {
      x: (clicked && showTablet) || showMobile ? 0 : clicked ? 1 : 0,
      duration: 1,
    });
  };

  const filearray2: Book[] = readIds.map((id) =>
    useLoader(GLTFLoader, `/book-model/${id}/scene.gltf`)
  );

  const heightArr = [];
  const createHeightArr = () => {
    let j = -0.65;
    let k = -1.4;
    for (let i = 0; readIds.length > heightArr.length; i--) {
      if (i === 0) {
        heightArr.push(i);
      } else {
        const resValue = showTablet ? i : showMobile ? j : k;
        heightArr.push(resValue);
        j = j - 0.65;
        k = k - 1.4;
      }
    }
    return heightArr;
  };
  createHeightArr();

  useLayoutEffect(() => {
    gsapFunc();
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setShowTablet(false);
        setShowMobile(false);
      } else if (window.innerWidth < 800 && window.innerWidth > 500) {
        setShowTablet(true);
        setShowMobile(false);
      } else {
        setShowMobile(true);
        setShowTablet(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <group ref={group}>
      {filearray2.map((book, i: number) => (
        <mesh
          key={i}
          name={readIds[i]}
          position={[0, heightArr[i], -0.5]}
          rotation={[0, 4.75, 0.45]}
          ref={mesh}
          onClick={handleClick}
        >
          <primitive
            scale={[
              showTablet ? 0.007 : showMobile ? 0.0045 : 0.01,
              showTablet ? 0.007 : showMobile ? 0.0045 : 0.01,
              showTablet ? 0.007 : showMobile ? 0.0045 : 0.01,
            ]}
            object={book.scene}
          />
        </mesh>
      ))}
    </group>
  );
}
