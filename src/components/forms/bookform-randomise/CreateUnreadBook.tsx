import { useState } from "react"
import { Modal, Button } from "antd"
import CreateBookForm from "./CreateUnreadBookForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setShowCreate } from "@/store/lib/features/auth/editButtonsSlice"

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
      <div className="flex items-center">
        <Button className="m-5" onClick={showModal} size="large">
          Add book
        </Button>
      </div>
      <Modal
        title="Add a book"
        open={showCreateBook}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  )
}

export default CreateBook
