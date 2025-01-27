/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Button } from "antd";
import { useState } from "react";
import "../../style/login.css";
import { useAppDispatch } from "@/lib/hooks";
import { removeToken } from "@/lib/features/auth/tokenSlice";

const Logout: React.FC = () => {
  const [loadings, setLoadings] = useState([]);

  const dispatch = useAppDispatch();

  const handleClick = () => {
    setLoadings([true]);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      setLoadings([false]);
      dispatch(removeToken());
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
          onClick={handleClick}
        >
          Logout
        </Button>
      </div>
    </>
  );
};

export default Logout;
