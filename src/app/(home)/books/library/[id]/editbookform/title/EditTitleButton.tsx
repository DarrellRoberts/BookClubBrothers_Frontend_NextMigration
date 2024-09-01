/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Button } from "antd";

type ActionType = {
  type: string;
};

interface props {
  dispatch: React.Dispatch<ActionType>;
  showTitle: boolean;
}

const EditTitleButton: React.FC<props> = ({ dispatch, showTitle }) => {
  return (
    <>
      <div className="flex items-center">
        {showTitle ? (
          <Button
            className="ml-5"
            onClick={() => dispatch({ type: "toggleShowTitle" })}
          >
            X
          </Button>
        ) : (
          <Button
            className="ml-5"
            onClick={() => dispatch({ type: "toggleShowTitle" })}
          >
            Edit Title
          </Button>
        )}
      </div>
    </>
  );
};

export default EditTitleButton;
