import { setShowPublish } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditPublishButton = () => {
  const showPublish = useAppSelector(
    (state) => state.editBookButtons.showPublish
  )
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex items-center">
        {showPublish ? (
          <Button
            className="mb-5"
            onClick={() => dispatch(setShowPublish())}
            size="large"
          >
            X
          </Button>
        ) : (
          <Button
            className="mb-5"
            onClick={() => dispatch(setShowPublish())}
            size="large"
          >
            Edit Year
          </Button>
        )}
      </div>
    </>
  )
}

export default EditPublishButton
