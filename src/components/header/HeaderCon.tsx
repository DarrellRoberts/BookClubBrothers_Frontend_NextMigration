/* eslint-disable react/react-in-jsx-scope */
"use client";

import Login from "../user/Login";
import "../../style/header.css";
import "../../style/headerRes.css";
import HeaderLinks from "./HeaderLinks";
import HeaderLinksMobile from "./HeaderLinksMobile";
import { Button } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useJwt } from "react-jwt";
import { getTime } from "../../functions/timeFunction";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

const HeaderCon: React.FC = () => {
  const [loadings, setLoadings] = useState([]);
  const { logout, token } = useContext(AuthContext);
  const { decodedToken }: { decodedToken?: { username: string } } =
    useJwt(token);

  const handleDesktop = useMediaQuery({ query: "(min-device-width: 801px)" });

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

  return (
    <div className="bg-black flex justify-between items-center">
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
            <div className="headerLinks">
              <HeaderLinks />
            </div>
          ) : (
            <div className="headerLinksMobCon">
              <HeaderLinksMobile />
            </div>
          )}

          <div className="flex items-center mr-10 greetingCon">
            <Link href="/">
              <h2 className="text-white text-3xl greeting">
                {`${headerMessage} ${decodedToken?.username}`}
              </h2>
            </Link>
          </div>
        </>
      ) : (
        <>
          <Login />

          {handleDesktop ? (
            <div className="headerLinks">
              <HeaderLinks />
            </div>
          ) : (
            <div className="headerLinksMobCon">
              <HeaderLinksMobile />
            </div>
          )}
          <Link href="/">
            <div className="border-4 border-white border-solid pr-5 pl-5 pt-2 pb-2 mr-5 mb-2 mt-2">
              <h2 className="logo">B</h2>
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderCon;
