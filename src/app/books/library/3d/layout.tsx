import React from "react";
import style from "./3d.module.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={style.noScroll} lang="en">
      {children}
    </html>
  );
}
