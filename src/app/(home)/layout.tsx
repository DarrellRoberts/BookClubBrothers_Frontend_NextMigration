import React from "react";
import type { Metadata } from "next";
import AuthContextProvider from "../../context/AuthContext";
import QueryProvider from "@/query/QueryProvider";
import ScrollToTop from "../../functions/ScrollToTop";
import "../globals.css";
import dynamic from "next/dynamic";
import Footer from "@/components/footer/Footer";

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
      <QueryProvider>
        <AuthContextProvider>
          <ScrollToTop />
          <head>
            <link rel="icon" href="./icon.svg" type="image/svg+xml" />
          </head>
          <body>
            <NoSSRHeader />
            {children}
            <Footer />
          </body>
        </AuthContextProvider>
      </QueryProvider>
    </html>
  );
}
