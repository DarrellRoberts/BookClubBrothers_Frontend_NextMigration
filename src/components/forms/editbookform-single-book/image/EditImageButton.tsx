import { setShowBookImage } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditImageButton = () => {
  const showBookImage = useAppSelector(
    (state) => state.editBookButtons.showBookImage
  )
  const dispatch = useAppDispatch()

  return (
    <>
      <div className="flex items-center">
        {showBookImage ? (
          <Button
            className="m-5"
            onClick={() => dispatch(setShowBookImage())}
            size="large"
          >
            X
          </Button>
        ) : (
          <Button
            className="ml-5 mb-5"
            onClick={() => dispatch(setShowBookImage())}
            size="large"
          >
            Change image
          </Button>
        )}
      </div>
    </>
  )
}

export default EditImageButton
