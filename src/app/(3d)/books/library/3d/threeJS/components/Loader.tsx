import React from "react";
import { Html } from "@react-three/drei";
import style from "../../../../../3d.module.css";
import LoaderNoText from "@/components/loader/LoaderNoText";

export default function Loader() {
  return (
    <Html as="div" center>
      <LoaderNoText />
      <h1 className={style.loadTitle}>
        Loading</h1>
    </Html>
  );
}
