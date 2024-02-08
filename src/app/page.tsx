"use client"

import Homepage from "../components/homepage/Homepage";
import Dashboard from "./brothers/[username]/Dashboard"
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

export default function Home() {
  const { token } = useContext(AuthContext);
return (
<>
  {token ?  <Dashboard /> : <Homepage />} 
</>
  );
}
