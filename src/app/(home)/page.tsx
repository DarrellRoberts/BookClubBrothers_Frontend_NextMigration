"use client";

import React from "react";
import Homepage from "../../components/homepage/Homepage";
import Dashboard from "./brothers/library/[username]/page";
import { useAppSelector } from "@/lib/hooks";

export default function Home() {
  const token = useAppSelector((state) => state.token.tokenState);

  return (
    <>
      {token ? (
        <Dashboard />
      ) : (
        <div className="h-screen">
          <Homepage />
        </div>
      )}
    </>
  );
}
