"use client";
import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import style from "./dark-mode.module.css";

const DarkMode: React.FC = () => {
  const checkBox = useRef<HTMLInputElement>(null);

  const setCookie = (): void => {
    const darkCookie = Cookies.get("dark-mode");
    if (!darkCookie) {
      Cookies.set("dark-mode", "true");
    } else {
      Cookies.remove("dark-mode");
    }
  };

  useEffect(() => {
    const darkCookie: string | undefined = Cookies.get("dark-mode");
    if (darkCookie) {
      if (checkBox.current) {
        checkBox.current.checked = true;
      }
    }
  }, []);
  return (
    <div className={style.themeCon}>
      <label htmlFor="theme">Change Theme</label>
      <input
        type="checkbox"
        id="theme"
        ref={checkBox}
        name="dark_mode"
        onClick={setCookie}
      />
    </div>
  );
};

export default DarkMode;