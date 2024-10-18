/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { type Dispatch } from "react";
import { ACTIONS } from "./actions";
import { Button } from "antd";
import SelectBook from "./bookform/SelectBook";
import style from "./randomiser.module.css";

type Props = {
  dispatch: Dispatch<unknown>,
  showRandom: boolean,
  bookLength: number,
  bookId: string,
  adminId: string,
  userId: string
}

const Randomiser: React.FC<Props> = ({ dispatch, showRandom, bookLength, bookId, adminId, userId }) => {

  const handleRandomise = () => {
    dispatch({
      type: ACTIONS.SETRANDOM,
      payload: false
    });
    const Int = setInterval(() => {
      dispatch({
        type: ACTIONS.SETINDEX,
        payload: Math.floor(Math.random() * bookLength),
      });
    }, 50);
    setTimeout(() => {
      clearInterval(Int);
      dispatch({
        type: ACTIONS.SETRANDOM,
        payload: true
      });
    }, 3000);
  };

  return (
    <>
      <div className={style.randomiseCon}>
        {showRandom ? (
          <>
            <Button onClick={handleRandomise}>Randomise</Button>
            {adminId === userId ? (
              <SelectBook bookId={bookId} dispatch={dispatch} />
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};

export default Randomiser;
