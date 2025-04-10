/* eslint-disable react/react-in-jsx-scope */
import { setShowAuthor } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditAuthorButton = () => {
  const showAuthor = useAppSelector((state) => state.editBookButtons.showAuthor)
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex items-center">
        {showAuthor ? (
          <Button className="mb-5" onClick={() => dispatch(setShowAuthor())}>
            X
          </Button>
        ) : (
          <Button className="mb-5" onClick={() => dispatch(setShowAuthor())}>
            Edit Author
          </Button>
        )}
      </div>
    </>
  )
}

export default EditAuthorButton
