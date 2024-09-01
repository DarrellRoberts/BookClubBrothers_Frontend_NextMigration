import React from "react";
import style from "./3d.module.css";
import "../globals.css";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={style.noScroll} lang="en">
        {children}
      </body>
    </html>
  );
}
