import { setShowTitle } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditTitleButton = () => {
  const showTitle = useAppSelector((state) => state.editBookButtons.showTitle)
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex items-center">
        {showTitle ? (
          <Button
            className="ml-5"
            onClick={() => dispatch(setShowTitle())}
            size="large"
          >
            X
          </Button>
        ) : (
          <Button
            className="ml-5"
            onClick={() => dispatch(setShowTitle())}
            size="large"
          >
            Edit Title
          </Button>
        )}
      </div>
    </>
  )
}

export default EditTitleButton
