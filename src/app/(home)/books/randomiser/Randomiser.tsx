/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Dispatch, useState } from "react";
import { ACTIONS } from "./actions";
import { Button } from "antd";
import SelectBook from "./bookform/SelectBook";
import style from "./randomiser.module.css";

interface props {
  dispatch: Dispatch<unknown>;
  bookLength: number;
  bookId: string;
}

const Randomiser: React.FC<props> = ({ dispatch, bookLength, bookId }) => {
  const [showRandom, setShowRandom] = useState<boolean>(true);

  const handleRandomise = () => {
    setShowRandom(false);
    const Int = setInterval(() => {
      dispatch({
        type: ACTIONS.SETINDEX,
        payload: Math.floor(Math.random() * bookLength),
      });
    }, 50);
    setTimeout(() => {
      clearInterval(Int);
      setShowRandom(true);
    }, 3000);
  };

  return (
    <>
      <div className={style.randomiseCon}>
        {showRandom ? (
          <>
            <Button onClick={handleRandomise}>Randomise</Button>
            <SelectBook bookId={bookId} dispatch={dispatch} />
          </>
        ) : null}
      </div>
    </>
  );
};

export default Randomiser;
