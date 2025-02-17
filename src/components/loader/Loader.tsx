/* eslint-disable react/react-in-jsx-scope */
"use client";

import "@/style/loader.css";
import { useState, useEffect } from "react";

interface Props {
  screensize?: string;
}

const Loader: React.FC<Props> = ({ screensize }: Props) => {
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [showQuiz, setShowQuiz] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingMessage(
        "Sorry for the wait...Render, the cloud platform I'm using, wants me to pay money for a faster API-fetch time. Fat chance that is happening.... won't be long now"
      );
    }, 10000);
    setTimeout(() => {
      setLoadingMessage(
        "..it's been awhile now. This will only happen the first time you load."
      );
    }, 25000);
    setTimeout(() => {
      setLoadingMessage(
        "..alright, it's been 35secs. Here's snake to keep you busy."
      );
      setShowQuiz(true);
    }, 35000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={`${
        screensize ?? "h-screen"
      } flex justify-center items-center flex-col`}
    >
      {showQuiz ? (
        <>
          <h2 className="m-5 text-center text-xl">{loadingMessage}</h2>
          <iframe
            src="https://snakegame.org/"
            height="600"
            width="100%"
            scrolling="no"
          ></iframe>
        </>
      ) : (
        <>
          <span className="loader"></span>
          <h2 className="m-5 text-center text-xl">{loadingMessage}</h2>
        </>
      )}
    </div>
  );
};

export default Loader;
