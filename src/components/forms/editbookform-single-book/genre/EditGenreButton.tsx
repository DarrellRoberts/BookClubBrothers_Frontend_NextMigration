/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { setShowGenre } from "@/store/lib/features/books/editBookButtonsSlice";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { Button } from "antd";

const EditGenreButton = () => {
  const showGenre = useAppSelector((state) => state.editBookButtons.showGenre);
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="flex items-center">
        {showGenre ? (
          <Button className="mb-5" onClick={() => dispatch(setShowGenre())}>
            X
          </Button>
        ) : (
          <Button className="mb-5" onClick={() => dispatch(setShowGenre())}>
            Edit Genre
          </Button>
        )}
      </div>
    </>
  );
};

export default EditGenreButton;
