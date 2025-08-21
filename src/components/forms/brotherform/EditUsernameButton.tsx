/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client"

import { Button, Modal } from "antd"
import { useState } from "react"
import EditUsername from "./EditUsername"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setShowUsername } from "@/store/lib/features/auth/editButtonsSlice"

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
    console.log(showUsername)
    dispatch(setShowUsername())
  }
  return (
    <>
      <div className="flex items-center">
        {showUsername ? null : (
          <Button className="" onClick={showModal} size="large">
            Edit
          </Button>
        )}
      </div>
      <Modal
        title="Change your Username"
        open={showUsername}
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

export default EditUsernameButton
