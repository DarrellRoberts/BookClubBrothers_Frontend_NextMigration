/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { setShowPage } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditPagesButton = () => {
  const showPage = useAppSelector((state) => state.editBookButtons.showPage)
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex items-center">
        {showPage ? (
          <Button
            className="mb-5"
            onClick={() => dispatch(setShowPage())}
            size="large"
          >
            X
          </Button>
        ) : (
          <Button
            className="mb-5"
            onClick={() => dispatch(setShowPage())}
            size="large"
          >
            Edit Pages
          </Button>
        )}
      </div>
    </>
  )
}

export default EditPagesButton
