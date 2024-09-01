import React from "react";
import type { Metadata } from "next";
import AuthContextProvider from "../../context/authContext";
import ScrollToTop from "../../functions/ScrollToTop";
import "../globals.css";
import dynamic from "next/dynamic";

const NoSSRHeader = dynamic(() => import("../../components/header/HeaderCon"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Book Club Brothers",
  description:
    "A book club formed of old school friends who meet regularly over an online call, discuss books they have read and rate them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <ScrollToTop />
        <head>
          <link rel="icon" href="./icon.svg" type="image/svg+xml" />
        </head>
        <body>
          <header>
            <NoSSRHeader />
          </header>
          {children}
        </body>
      </AuthContextProvider>
    </html>
  );
}
