import { setShowGenre } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditGenreButton = () => {
  const showGenre = useAppSelector((state) => state.editBookButtons.showGenre)
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex items-center">
        {showGenre ? (
          <Button
            className="mb-5"
            onClick={() => dispatch(setShowGenre())}
            size="large"
          >
            X
          </Button>
        ) : (
          <Button
            className="mb-5"
            onClick={() => dispatch(setShowGenre())}
            size="large"
          >
            Edit Genre
          </Button>
        )}
      </div>
    </>
  )
}

export default EditGenreButton
