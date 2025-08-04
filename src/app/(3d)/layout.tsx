import React from "react"
import "../globals.css"
import StoreProvider from "../../store/StoreProvider"

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <StoreProvider>
        <body className="overflow-y-hidden max-md:overflow-y-auto" lang="en">
          {children}
        </body>
      </StoreProvider>
    </html>
  )
}
