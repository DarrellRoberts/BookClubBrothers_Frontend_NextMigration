import { UiButton } from "@/components/ui/button/UiButton"
import { setShowGenre } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditGenreButton = () => {
  const showGenre = useAppSelector((state) => state.editBookButtons.showGenre)
  const dispatch = useAppDispatch()
  return (
    <div className="flex items-center">
      <UiButton
        textContent={showGenre ? "X" : "Edit Genre"}
        clickHandler={() => dispatch(setShowGenre())}
      />
    </div>
  )
}

export default EditGenreButton
