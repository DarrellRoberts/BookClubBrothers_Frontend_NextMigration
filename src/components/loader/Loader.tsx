import "../../style/loader.css";
import { useState, useEffect } from "react";
import LoaderQuiz from "./LoaderQuiz";

const Loader: React.FC = () => {
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  const [showQuiz, setShowQuiz] = useState(false);

  const Loading = () => {
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
        "..alright, it's been 35secs. Here's a quiz to keep you busy."
      );
      setShowQuiz(true);
    }, 35000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    Loading();
  }, []);
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      {showQuiz ? <LoaderQuiz /> : null}
      <span className="loader"></span>
      <h2 className="m-5 text-center text-xl">{loadingMessage}</h2>
    </div>
  );
};

export default Loader;
