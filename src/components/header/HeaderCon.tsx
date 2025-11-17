"use client"

import Login from "../user/Login"
import HeaderLinks from "./HeaderLinks"
import HeaderLinksMobile from "./HeaderLinksMobile"
import { useRef, useEffect } from "react"
import { getTime } from "../../utils/time-functions/getTime"
import Link from "next/link"
import { useMediaQuery } from "react-responsive"
import Logo from "../misc/Logo"
import Logout from "../user/Logout"
import { useAppSelector } from "@/store/lib/hooks"
import { useAuth } from "@/hooks/auth-hooks/useAuth"

type Props = {
  propsToken?: string
}

const HeaderCon: React.FC<Props> = ({ propsToken }) => {
  const token = propsToken
    ? propsToken
    : useAppSelector((state) => state.token.tokenState)

  const { decodedToken } = useAuth()

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
      className={`flex justify-between items-center w-full bg-black ${
        !token && !propsToken ? "pb-0" : ""
      }`}
    >
      {token || propsToken ? (
        <>
          <Logout />
          {handleDesktop ? (
            <div className="flex justify-evenly w-1/2 text-2xl text-white">
              <HeaderLinks />
            </div>
          ) : (
            <div className="flex justify-center text-white">
              <HeaderLinksMobile />
            </div>
          )}

          <div className="flex items-center justify-end">
            <Link href="/">
              <h2
                className={`text-white text-3xl max-sm:text-xl text-end mx-2 ${
                  !token && !propsToken ? "pb-0" : ""
                }`}
              >
                {`${headerMessage} ${decodedToken?.username}`}
              </h2>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Login />

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
