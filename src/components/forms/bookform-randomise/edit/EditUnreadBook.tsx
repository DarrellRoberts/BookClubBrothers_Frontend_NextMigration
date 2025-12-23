import { Modal, Button } from "antd"
import EditForm from "./EditForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setShowEdit } from "@/store/lib/features/auth/editButtonsSlice"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiModal } from "@/components/ui/modal/UiModal"

type Props = {
  id: string
  inAuthor: string
  inTitle: string
  inPublished: number
  inPages: number
  inGenre: string[]
  inImageURL: string
}

const EditUnreadBook: React.FC<Props> = ({
  id,
  inAuthor,
  inTitle,
  inPublished,
  inPages,
  inGenre,
  inImageURL,
}) => {
  const showEditBook = useAppSelector((state) => state.editButtons.showEdit)
  const dispatch = useAppDispatch()

  const showModal = () => {
    dispatch(setShowEdit())
  }
  const handleCancel = () => {
    dispatch(setShowEdit())
  }
  return (
    <>
      <div className="flex items-center m-5">
        <UiButton clickHandler={showModal} textContent="Edit Book" />
      </div>
      <UiModal
        title={"Edit book"}
        open={showEditBook}
        handleCancel={handleCancel}
      >
        <EditForm
          key={id}
          id={id}
          inAuthor={inAuthor}
          inTitle={inTitle}
          inPublished={inPublished}
          inPages={inPages}
          inGenre={inGenre}
          inImageURL={inImageURL}
        />
      </UiModal>
    </>
  )
}

export default EditUnreadBook
