import React from "react";
import style from "@/components/3d/threeJS/components/3d.module.css";
import "../globals.css";
import StoreProvider from "@/store/StoreProvider";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <StoreProvider>
        <body className={style.noScroll} lang="en">
          {children}
        </body>
      </StoreProvider>
    </html>
  );
}
