import { UiButton } from "@/components/ui/button/UiButton"
import { setShowAuthor } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditAuthorButton = () => {
  const showAuthor = useAppSelector((state) => state.editBookButtons.showAuthor)
  const dispatch = useAppDispatch()
  return (
    <div className="flex items-center mb-5">
      <UiButton
        textContent={showAuthor ? "X" : "Edit Author"}
        clickHandler={() => dispatch(setShowAuthor())}
      />
    </div>
  )
}

export default EditAuthorButton
