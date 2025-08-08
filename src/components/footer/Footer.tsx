import React from "react"
import styles from "./footer.module.css"
import Link from "next/link"
import DarkMode from "../misc/dark-mode/DarkMode"

export default function Footer() {
  const newDate = new Date()
  return (
    <div className={styles.footerCon}>
      <DarkMode />
      <Link target="_blank" href="https://www.darrellroberts.com/">
        <span>Darrell Roberts @{newDate.getFullYear()}</span>
      </Link>
    </div>
  )
}
