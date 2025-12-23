import { UiButton } from "@/components/ui/button/UiButton"
import { setShowTitle } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditTitleButton = () => {
  const showTitle = useAppSelector((state) => state.editBookButtons.showTitle)
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="flex items-center">
        <UiButton
          textContent={showTitle ? "X" : "Edit Title"}
          clickHandler={() => dispatch(setShowTitle())}
        />
      </div>
    </>
  )
}

export default EditTitleButton
