import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <div className={styles.footerCon}>
      <Link target="_blank" href="https://www.darrellroberts.com/"><span>Darrell Roberts @2024</span></Link>
    </div>
  );
}