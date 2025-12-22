import { UiButton } from "@/components/ui/button/UiButton"
import { setShowDate } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditActualDateButton = () => {
  const showDate = useAppSelector((state) => state.editBookButtons.showDate)
  const dispatch = useAppDispatch()
  return (
    <div className="flex items-center mb-5">
      <UiButton
        textContent={showDate ? "X" : "Edit Actual Date"}
        clickHandler={() => dispatch(setShowDate())}
      />
    </div>
  )
}

export default EditActualDateButton
