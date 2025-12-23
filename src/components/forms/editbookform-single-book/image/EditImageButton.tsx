import { UiButton } from "@/components/ui/button/UiButton"
import { setShowBookImage } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"

const EditImageButton = () => {
  const showBookImage = useAppSelector(
    (state) => state.editBookButtons.showBookImage
  )
  const dispatch = useAppDispatch()

  return (
    <div className="flex items-center mb-5">
      <UiButton
        textContent={showBookImage ? "X" : "Change Image"}
        clickHandler={() => dispatch(setShowBookImage())}
      />
    </div>
  )
}

export default EditImageButton
