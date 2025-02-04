/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { setShowDate } from "@/store/lib/features/books/editBookButtonsSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Button } from "antd";

const EditDateButton = () => {
  const showDate = useAppSelector((state) => state.editBookButtons.showDate);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex items-center">
        {showDate ? (
          <Button className="mb-5" onClick={() => dispatch(setShowDate())}>
            X
          </Button>
        ) : (
          <Button className="mb-5" onClick={() => dispatch(setShowDate())}>
            Edit Date
          </Button>
        )}
      </div>
    </>
  );
};

export default EditDateButton;
