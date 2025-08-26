import React from "react"
import { Html } from "@react-three/drei"
import LoaderNoText from "@/components/loader/LoaderNoText"

export default function Loader() {
  return (
    <Html as="div" center>
      <LoaderNoText />
      <h1 className="font-main text-4xl md:text-5xl lg:text-6xl w-full text-center">
        Loading
      </h1>
    </Html>
  )
}
