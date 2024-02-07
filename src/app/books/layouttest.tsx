// import dynamic from "next/dynamic"
import HeaderCon from "@/components/header/HeaderCon";
import Back from "@/components/misc/Back";

// const NoSSRBack = dynamic(() => import("../../components/misc/Back"), {ssr: false})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body>
          <header>
          <HeaderCon />
          </header>
          <Back />
        {/* <NoSSRBack /> */}
        {children}
        </body>
    </html>
  );
}
