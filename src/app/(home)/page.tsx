"use client";

import React from "react";
import Homepage from "../../components/homepage/Homepage";
import Dashboard from "./brothers/library/[username]/Dashboard";
import { useContext } from "react";
import { AuthContext } from "../../context/authContext";

export default function Home() {
  const { token } = useContext(AuthContext);
  return <>{token ? <Dashboard /> : <Homepage />}</>;
}
