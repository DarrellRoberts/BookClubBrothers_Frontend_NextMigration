import type { Metadata } from "next";
import AuthContextProvider from "../context/authContext";
import "./globals.css";
import HeaderCon from "@/components/header/HeaderCon";

export const metadata: Metadata = {
  title: "Book Club Brothers",
  description: "A bookclub formed of old school friends who meet regularly over an online call, discuss books they have read and rate them.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthContextProvider>
        <body>
          <header>
          <HeaderCon />
          </header>
        {children}
        </body>
      </AuthContextProvider>
    </html>
  );
}
