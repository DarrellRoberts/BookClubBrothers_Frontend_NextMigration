/* eslint-disable react/react-in-jsx-scope */
"use client";

import Login from "../user/Login";
import HeaderLinks from "./HeaderLinks";
import HeaderLinksMobile from "./HeaderLinksMobile";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { useJwt } from "react-jwt";
import { getTime } from "../../functions/timeFunction";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import style from "./headerCon.module.css";
import Logo from "../misc/Logo";
import Logout from "../user/Logout";

const HeaderCon: React.FC = () => {
  const { token } = useContext(AuthContext);
  const { decodedToken }: { decodedToken?: { token: string, username: string } } =
    useJwt(token);

  const handleDesktop = useMediaQuery({ query: "(min-device-width: 801px)" });
  const headerCon = useRef(null);

  const headerMessage = getTime();

  //neccessary for the (3d) layout
  headerCon.current ? headerCon.current.parentElement.style.position = "static" : "";
  return (
    <header ref={headerCon} className={token ? style.headerConToken : style.headerConNoToken}>
      {token ? (
        <>
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
