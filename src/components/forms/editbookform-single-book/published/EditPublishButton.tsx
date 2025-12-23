import { UiButton } from "@/components/ui/button/UiButton"
import { setShowPublish } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditPublishButton = () => {
  const showPublish = useAppSelector(
    (state) => state.editBookButtons.showPublish
  )
  const dispatch = useAppDispatch()
  return (
    <div className="flex items-center mb-5">
      <UiButton
        textContent={showPublish ? "X" : "Edit Year"}
        clickHandler={() => dispatch(setShowPublish())}
      />
    </div>
  )
}

export default EditPublishButton
