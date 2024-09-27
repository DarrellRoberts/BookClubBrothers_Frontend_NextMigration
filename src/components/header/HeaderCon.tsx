/* eslint-disable react/react-in-jsx-scope */
"use client";

import Login from "../user/Login";
import HeaderLinks from "./HeaderLinks";
import HeaderLinksMobile from "./HeaderLinksMobile";
import { Button } from "antd";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../context/authContext";
import { useJwt } from "react-jwt";
import { getTime } from "../../functions/timeFunction";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import style from "./HeaderCob.module.css";
import Logo from "../misc/Logo";

const HeaderCon: React.FC = () => {
  const [loadings, setLoadings] = useState([]);
  const { logout, token } = useContext(AuthContext);
  const { decodedToken }: { decodedToken?: { username: string } } =
    useJwt(token);

  const handleDesktop = useMediaQuery({ query: "(min-device-width: 801px)" });
  const headerCon = useRef(null);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 6000);
  };

  const handleClick = () => {
    enterLoading(0);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      logout();
    }, 5000);
  };
  const headerMessage = getTime();

  //neccessary for the (3d) layout
  headerCon.current ? headerCon.current.parentElement.style.position = "static" : "";
  return (
    <header ref={headerCon} className={token ? style.headerConToken : style.headerConNoToken}>
      {token ? (
        <>
          <div className="flex items-center">
            <Button
              className="m-5"
              type="primary"
              ghost
              loading={loadings[0]}
              onClick={handleClick}
            >
              Logout
            </Button>
          </div>

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
