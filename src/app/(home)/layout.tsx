import React from "react"
import type { Metadata } from "next"
import QueryProvider from "@/query/QueryProvider"
import ScrollToTop from "../../utils/ScrollToTop"
import "../globals.css"
import Footer from "@/components/footer/Footer"
import StoreProvider from "@/store/StoreProvider"
import HeaderCon from "@/components/header/HeaderCon"
import { ConfigProvider } from "antd"
import theme from "@/theme/theme.config"

export const metadata: Metadata = {
  title: "Book Club Brothers",
  description:
    "A book club formed of old school friends who meet regularly over an online call, discuss books they have read and rate them.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <ConfigProvider theme={theme}>
        <QueryProvider>
          <StoreProvider>
            <ScrollToTop />
            <head>
              <link rel="icon" href="./icon.svg" type="image/svg+xml" />
            </head>
            <body className="overflow-x-hidden">
              <HeaderCon />
              {children}
              <Footer />
            </body>
          </StoreProvider>
        </QueryProvider>
      </ConfigProvider>
    </html>
  )
}
