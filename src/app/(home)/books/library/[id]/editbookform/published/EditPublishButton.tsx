/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Button } from "antd";

type ActionType = {
  type: string;
};

interface props {
  dispatch: React.Dispatch<ActionType>;
  showPublish: boolean;
}

const EditPublishButton: React.FC<props> = ({ dispatch, showPublish }) => {
  return (
    <>
      <div className="flex items-center">
        {showPublish ? (
          <Button
            className="mb-5"
            onClick={() => dispatch({ type: "toggleShowPublish" })}
          >
            X
          </Button>
        ) : (
          <Button
            className="mb-5"
            onClick={() => dispatch({ type: "toggleShowPublish" })}
          >
            Edit Year
          </Button>
        )}
      </div>
    </>
  );
};

export default EditPublishButton;
