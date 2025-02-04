/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { setShowPublish } from "@/store/lib/features/books/editBookButtonsSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Button } from "antd";

const EditPublishButton = () => {
  const showPublish = useAppSelector(
    (state) => state.editBookButtons.showPublish
  );
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex items-center">
        {showPublish ? (
          <Button className="mb-5" onClick={() => dispatch(setShowPublish())}>
            X
          </Button>
        ) : (
          <Button className="mb-5" onClick={() => dispatch(setShowPublish())}>
            Edit Year
          </Button>
        )}
      </div>
    </>
  );
};

export default EditPublishButton;
