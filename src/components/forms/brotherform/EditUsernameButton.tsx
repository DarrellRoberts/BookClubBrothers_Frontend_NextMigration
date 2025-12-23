"use client"

import { Modal } from "antd"
import { useState } from "react"
import EditUsername from "./EditUsername"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setShowUsername } from "@/store/lib/features/auth/editButtonsSlice"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiModal } from "@/components/ui/modal/UiModal"

type Props = {
  id: string
  inUsername: string
}

const EditUsernameButton: React.FC<Props> = ({ id, inUsername }) => {
  const [modalText, setModalText] = useState(
    <EditUsername id={id} inUsername={inUsername} />
  )
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const showUsername = useAppSelector((state) => state.editButtons.showUsername)
  const dispatch = useAppDispatch()

  const showModal = () => {
    dispatch(setShowUsername())
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      dispatch(setShowUsername())
    }, 4000)
    setModalText(<EditUsername id={id} inUsername={inUsername} />)
  }
  const handleCancel = () => {
    dispatch(setShowUsername())
  }
  return (
    <>
      <div className="flex items-center">
        {showUsername ? null : (
          <UiButton clickHandler={() => showModal()} textContent="Edit" />
        )}
      </div>
      <UiModal
        title={"Change your Username"}
        open={showUsername}
        handleCancel={handleCancel}
        handleOk={handleOk}
        confirmLoading={confirmLoading}
      >
        {modalText}
      </UiModal>
    </>
  )
}

export default EditUsernameButton
