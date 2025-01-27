"use client";

import React from "react";
import Homepage from "../../components/homepage/Homepage";
import Dashboard from "./brothers/library/[username]/page";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  // const { token } = useContext(AuthContext);
  const authState = useAppSelector((state) => state.auth.authState);

  return (
    <>
      {/* <StoreProvider> */}
      {authState ? (
        <Dashboard />
      ) : (
        <div className="h-screen">
          <Homepage />
        </div>
      )}
      {/* </StoreProvider> */}
    </>
  );
}
