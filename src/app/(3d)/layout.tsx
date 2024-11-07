import React from "react";
import style from "./3d.module.css";
import "../globals.css";
import AuthContextProvider from "@/context/AuthContext";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <AuthContextProvider>
        <body className={style.noScroll} lang="en">
          {children}
        </body>
      </AuthContextProvider>
    </html>
  );
}
