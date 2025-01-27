/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import Login from "../user/Login";
import HeaderLinks from "./HeaderLinks";
import HeaderLinksMobile from "./HeaderLinksMobile";
import { useEffect, useRef } from "react";
import { getTime } from "../../functions/time-functions/timeFunction";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import style from "./header-con.module.css";
import Logo from "../misc/Logo";
import Logout from "../user/Logout";
import Celebration from "../misc/celebration/Celebration";
import { useAppSelector } from "@/lib/hooks";
import { useJwt } from "react-jwt";

type Props = {
  propsToken?: string;
};

const HeaderCon: React.FC<Props> = ({ propsToken }) => {
  const token = useAppSelector((state) => state.token.tokenState);

  const {
    decodedToken,
  }: { decodedToken?: { token: string; username: string; exp: number } } = token
    ? useJwt(token)
    : useJwt(propsToken);

  const handleDesktop = useMediaQuery({ query: "(min-device-width: 801px)" });
  const headerCon = useRef(null);

  const headerMessage = getTime();

  //neccessary for the (3d) layout
  headerCon.current
    ? (headerCon.current.parentElement.style.position = "static")
    : "";
  headerCon.current ? (headerCon.current.style.height = "88px") : "";

  const expired = useJwt(token)?.isExpired;

  const isTokenExpired = (): void => {
    if (token) {
      if (expired) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        document.location.reload();
        console.log("token is expired");
      }
    }
  };
  useEffect(() => {
    isTokenExpired();
  }, []);
  return (
    <header
      ref={headerCon}
      className={token ? style.headerConToken : style.headerConNoToken}
    >
      {token || propsToken ? (
        <>
          {decodedToken?.username === "Josh" ? <Celebration /> : null}
          <Logout />
          {handleDesktop ? (
            <div className={style.headerLinks}>
              <HeaderLinks />
            </div>
          ) : (
            <div className={style.headerLinksMobCon}>
              <HeaderLinksMobile />
            </div>
          )}

          <div className={`${style.greetingCon} flex items-center mr-10`}>
            <Link href="/">
              <h2 className={`text-white text-3xl ${style.greeting}`}>
                {`${headerMessage} ${decodedToken?.username}`}
              </h2>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Login />

          {handleDesktop ? (
            <div className={style.headerLinks}>
              <HeaderLinks />
            </div>
          ) : (
            <div className={style.headerLinksMobCon}>
              <HeaderLinksMobile />
            </div>
          )}
          <Logo />
        </>
      )}
    </header>
  );
};

export default HeaderCon;
