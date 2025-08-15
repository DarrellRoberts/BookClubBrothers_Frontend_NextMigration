import React from "react"
import Link from "next/link"
import DarkMode from "../misc/dark-mode/DarkMode"

export default function Footer() {
  const newDate = new Date()
  return (
    <div className="flex justify-between bottom-[0%] items-end my-4">
      <DarkMode />
      <Link target="_blank" href="https://www.darrellroberts.com/">
        <span className="mx-8">Darrell Roberts @{newDate.getFullYear()}</span>
      </Link>
    </div>
  )
}
