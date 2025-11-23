"use client"

import Login3D from "../user/Login3D"
import HeaderLinks from "./HeaderLinks"
import HeaderLinksMobile from "./HeaderLinksMobile"
import { useRef, useEffect } from "react"
import { getTime } from "../../utils/time-functions/getTime"
import Link from "next/link"
import { useMediaQuery } from "react-responsive"
import Logo from "../misc/Logo"
import Logout3D from "../user/Logout3D"
import { useJwt } from "react-jwt"

type Props = {
  propsToken?: string
}

const HeaderCon: React.FC<Props> = ({ propsToken }) => {
  const {
    decodedToken,
  }: { decodedToken?: { token: string; username: string; exp: number } } =
    useJwt(propsToken)

  const handleDesktop = useMediaQuery({ query: "(min-device-width: 801px)" })
  const headerCon = useRef<HTMLElement>(null)

  const headerMessage = getTime()

  // Necessary for the (3d) layout
  useEffect(() => {
    if (headerCon.current) {
      if (headerCon.current.parentElement) {
        headerCon.current.parentElement.style.position = "static"
      }
      headerCon.current.style.height = "88px"
    }
  }, [])

  return (
    <header
      ref={headerCon}
      className={`flex justify-between items-center bg-black ${
        !propsToken ? "pb-0" : ""
      }`}
    >
      {propsToken ? (
        <>
          <Logout3D />
          {handleDesktop ? (
            <div className="flex justify-evenly w-1/2 font-[var(--main)] text-2xl text-white">
              <HeaderLinks />
            </div>
          ) : (
            <div className="flex justify-center text-white">
              <HeaderLinksMobile />
            </div>
          )}

          <div className="flex items-center mr-10">
            <Link href="/">
              <h2 className="text-white text-3xl max-xs:text-xl text-end max-xs:w-10">
                {`${headerMessage} ${decodedToken?.username}`}
              </h2>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Login3D />

          {handleDesktop ? (
            <div className="flex justify-evenly w-1/2 font-[var(--main)] text-2xl text-white">
              <HeaderLinks />
            </div>
          ) : (
            <div className="flex justify-center text-white">
              <HeaderLinksMobile />
            </div>
          )}
          <Logo />
        </>
      )}
    </header>
  )
}

export default HeaderCon
