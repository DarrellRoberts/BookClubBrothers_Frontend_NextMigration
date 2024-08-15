"use client";
import React from "react";
import {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
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

export default function Books3D({ clicked, setClicked, setClickId, readIds }: Props) {
  const [showTablet, setShowTablet] = useState<boolean>(false);
  const [showMobile, setShowMobile] = useState<boolean>(false);

  const FLOOR_HEIGHT: number = 3;
  const NB_FLOORS: number = 3;

  const GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader").GLTFLoader;
  const mesh = useRef<Mesh>(null!);
  const tl = useRef<GSAPTimeline>(null!);
  const group = useRef<Group>(null!);
  const scroll = useScroll();

  const trimmedIds = [readIds[readIds.length - 3], readIds[readIds.length - 2], readIds[readIds.length - 1]].reverse();

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration());
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(
      group.current.position,
      {
        duration: 2,
        y: FLOOR_HEIGHT * (NB_FLOORS - 1),
      },
      0
    );
  }, []);

  const handleClick = (e: Node | any) => {
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

  const filearray2: object[] = trimmedIds.map((id) =>
    useLoader(GLTFLoader, `/book-model/${id}/scene.gltf`)
  );

  const heightArray = [
    0,
    showTablet ? -1 : showMobile ? -0.65 : -1.4,
    showTablet ? -2 : showMobile ? -1.3 : -2.8,
  ];

  useEffect(() => {
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
    window.addEventListener("resize", handleResize);
    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  return (
    <group ref={group}>
      {filearray2.map((book: object, i: number) => (
        <mesh
          key={i}
          name={trimmedIds[i]}
          position={[0, heightArray[i], -0.5]}
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
