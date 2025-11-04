/* eslint-disable for-direction */
/* eslint-disable react/no-unknown-property */
"use client"
import React, { useMemo } from "react"
import {
  useRef,
  useLayoutEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { Mesh, Group } from "three"
import { useScroll, PresentationControls } from "@react-three/drei"
import gsap from "gsap"
import { useBookModels } from "@/hooks/threejs-hooks/useBookModels"
import BookMesh from "./BookMesh"

type Props = {
  clicked: boolean
  setClicked: Dispatch<SetStateAction<boolean>>
  setClickId: Dispatch<SetStateAction<string>>
  setRenderIds: Dispatch<SetStateAction<string[]>>
  readIds: string[]
  renderIds: string[]
  readBooks: string[]
}

type Book = {
  scene: object
}

export default function Books3D({
  clicked,
  setClicked,
  setClickId,
  renderIds,
}: Props) {
  const [showTablet, setShowTablet] = useState<boolean>(false)
  const [showMobile, setShowMobile] = useState<boolean>(false)

  const GLTFLoader =
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("three/examples/jsm/loaders/GLTFLoader").GLTFLoader
  const mesh = useRef<Mesh>(null!)
  const tl = useRef<GSAPTimeline>(null!)
  const group = useRef<Group>(null!)
  const scroll = useScroll()

  useFrame(() => {
    tl.current.seek(scroll.offset * tl.current.duration())
  })

  const gsapFunc = () => {
    tl.current = gsap.timeline()
    tl.current.fromTo(
      group.current.position,
      {
        duration: 2,
        y: 0,
      },
      {
        duration: 2,
        y: renderIds.length * 2,
      },
      0
    )
  }

  const handleClick = (e) => {
    setClicked(!clicked)
    setClickId(e.eventObject.name)
    gsap.to(e.eventObject.rotation, {
      x: clicked ? 5 : 0,
      y: clicked ? 3.5 : 4.75,
      z: clicked ? -0.5 : 0.45,
      duration: 1,
    })
    gsap.to(e.eventObject.position, {
      x: (clicked && showTablet) || showMobile ? 0 : clicked ? 1 : 0,
      duration: 1,
    })
  }

  const models = useBookModels(renderIds)

  const heightArray = useMemo(() => {
    const heightArr = []
    let j = -1.15
    let k = -1.9
    for (let i = -0.5; renderIds.length > heightArr.length; i--) {
      if (i === -0.5) {
        heightArr.push(i)
      } else {
        const resValue = showTablet ? i : showMobile ? j : k
        heightArr.push(resValue)
        j = j - 0.65
        k = k - 1.4
      }
    }
    return heightArr
  }, [renderIds, showTablet, showMobile])

  useLayoutEffect(() => {
    gsapFunc()
    const handleResize = () => {
      if (window.innerWidth > 800) {
        setShowTablet(false)
        setShowMobile(false)
      } else if (window.innerWidth < 800 && window.innerWidth > 500) {
        setShowTablet(true)
        setShowMobile(false)
      } else {
        setShowMobile(true)
        setShowTablet(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      tl.current.kill()
    }
  }, [])
  return (
    <group ref={group}>
      {models?.map((book, i: number) => (
        <BookMesh
          key={renderIds[i]}
          book={book}
          id={renderIds[i]}
          height={heightArray[i]}
          showTablet={showTablet}
          showMobile={showMobile}
          handleClick={handleClick}
        />
      ))}
    </group>
  )
}
