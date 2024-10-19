/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Button } from "antd";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import {handleLogout} from "@/functions/handleLogout";

import "../../style/login.css";

const Logout: React.FC = () => {
  const [loadings, setLoadings] = useState([]);

  const { logout, token } = useContext(AuthContext);


  const handleClick = () => {
    setLoadings([true]);
    setTimeout(() => {
      handleLogout(token);
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setLoadings([false]);
      logout();
    }, 3000);
  };
  return (
    <>
      <div className="flex items-center">
        <Button
          className="m-5"
          type="primary"
          ghost
          htmlType="submit"
          loading={loadings[0]}
          onClick={handleClick}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default Logout;
