import { useState } from "react"
import { Modal, Button, ConfigProvider } from "antd"
import CreateBookForm from "./CreateUnreadBookForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setShowCreate } from "@/store/lib/features/auth/editButtonsSlice"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiModal } from "@/components/ui/modal/UiModal"

const CreateBook = () => {
  const [modalText, setModalText] = useState(<CreateBookForm />)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const showCreateBook = useAppSelector((state) => state.editButtons.showCreate)

  const showModal = () => {
    dispatch(setShowCreate())
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      dispatch(setShowCreate())
    }, 4000)
    setModalText(<CreateBookForm />)
  }
  const handleCancel = () => {
    dispatch(setShowCreate())
  }
  return (
    <>
      <div className="flex items-center mt-5">
        <UiButton clickHandler={showModal} textContent="Add book" />
      </div>
      <ConfigProvider
        modal={{
          styles: {
            container: {
              background: "#095d09",
            },
          },
        }}
      >
        <UiModal
          title={"Add a book"}
          open={showCreateBook}
          handleOk={handleOk}
          confirmLoading={confirmLoading}
          handleCancel={handleCancel}
        >
          <div>{modalText}</div>
        </UiModal>
      </ConfigProvider>
    </>
  )
}

export default CreateBook
