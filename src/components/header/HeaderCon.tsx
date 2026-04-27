"use client"

import Login from "../user/Login"
import HeaderLinks from "./HeaderLinks"
import HeaderLinksMobile from "./HeaderLinksMobile"
import { useRef, useEffect } from "react"
import { getTime } from "../../utils/time-functions/getTime"
import Link from "next/link"
import Logo from "../misc/Logo"
import Logout from "../user/Logout"
import { useAppSelector } from "@/store/lib/hooks"
import { useDecodedJwt } from "@/hooks/auth-hooks/useDecodedJwt"
import { useAuth } from "@/hooks/auth-hooks/useAuth"

type Props = {
  propsToken?: string
}

const HeaderCon: React.FC<Props> = ({ propsToken }) => {
  const { username } = useDecodedJwt()
  const { isAuth } = useAuth()
  const headerCon = useRef<HTMLElement>(null)

  const headerMessage = getTime()

  // Necessary for the (3d) layout
  useEffect(() => {
    isAuth()
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
        username ? "pb-0" : ""
      }`}
    >
      {username ? (
        <>
          <Logout />
          <div className="hidden md:flex justify-evenly w-1/2 text-2xl text-white">
            <HeaderLinks />
          </div>
          <div className="md:hidden flex justify-center text-white">
            <HeaderLinksMobile />
          </div>

          <div className="flex items-center justify-end">
            <Link href="/">
              <h2
                className={`text-white text-3xl max-sm:text-xl text-end mx-2 ${
                  username ? "pb-0" : ""
                }`}
              >
                {`${headerMessage} ${username}`}
              </h2>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Login />

          <div className="hidden md:flex justify-evenly w-1/2 font-[var(--main)] text-2xl text-white">
            <HeaderLinks />
          </div>
          <div className="flex justify-center text-white md:hidden">
            <HeaderLinksMobile />
          </div>
          <Logo />
        </>
      )}
    </header>
  )
}

export default HeaderCon
