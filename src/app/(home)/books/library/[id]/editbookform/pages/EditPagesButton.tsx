/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button } from "antd";

type ActionType = {
  type: string;
};

interface props {
  dispatch: React.Dispatch<ActionType>;
  showPage: boolean;
}

const EditPagesButton: React.FC<props> = ({ dispatch, showPage }) => {
  return (
    <>
      <div className="flex items-center">
        {showPage ? (
          <Button
            className="mb-5"
            onClick={() => dispatch({ type: "toggleShowPage" })}
          >
            X
          </Button>
        ) : (
          <Button
            className="mb-5"
            onClick={() => dispatch({ type: "toggleShowPage" })}
          >
            Edit Pages
          </Button>
        )}
      </div>
    </>
  );
};

export default EditPagesButton;
