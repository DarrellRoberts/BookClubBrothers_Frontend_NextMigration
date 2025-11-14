import { setShowDate } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditDateButton = () => {
  const showDate = useAppSelector((state) => state.editBookButtons.showDate)
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex items-center">
        {showDate ? (
          <Button
            className="mb-5"
            onClick={() => dispatch(setShowDate())}
            size="large"
          >
            X
          </Button>
        ) : (
          <Button
            className="mb-5"
            onClick={() => dispatch(setShowDate())}
            size="large"
          >
            Edit Date
          </Button>
        )}
      </div>
    </>
  )
}

export default EditDateButton
