/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button } from "antd";

type ActionType = {
  type: string;
};

interface props {
  dispatch: React.Dispatch<ActionType>;
  showDate: boolean;
}

const EditDateButton: React.FC<props> = ({ dispatch, showDate }) => {
  return (
    <>
      <div className="flex items-center">
        {showDate ? (
          <Button
            className="mb-5"
            onClick={() => dispatch({ type: "toggleShowDate" })}
          >
            X
          </Button>
        ) : (
          <Button
            className="mb-5"
            onClick={() => dispatch({ type: "toggleShowDate" })}
          >
            Edit Date
          </Button>
        )}
      </div>
    </>
  );
};

export default EditDateButton;
