import { UiButton } from "@/components/ui/button/UiButton"
import { setShowPage } from "@/store/lib/features/books/editBookButtonsSlice"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { Button } from "antd"

const EditPagesButton = () => {
  const showPage = useAppSelector((state) => state.editBookButtons.showPage)
  const dispatch = useAppDispatch()
  return (
    <div className="flex items-center mb-5">
      <UiButton
        textContent={showPage ? "X" : "Edit Pages"}
        clickHandler={() => dispatch(setShowPage())}
      />
    </div>
  )
}

export default EditPagesButton
