"use client"

import { Button, Modal } from "antd"
import { useState } from "react"
import EditUsername from "./EditUsername"

interface props {
    setEditUsername: React.Dispatch<React.SetStateAction<boolean>>,
    editUsername: boolean,
    id: string,
    inUsername: string
}

const EditUsernameButton: React.FC<props> = ({
  setEditUsername, 
  editUsername, 
  id, 
  inUsername}) => {
  const [modalText, setModalText] = useState(<EditUsername id={id} inUsername={inUsername} />)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
      setEditUsername(true);
    };
    const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
      setEditUsername(false);
      }, 4000);
      setModalText(<EditUsername id={id} inUsername={inUsername} />)
    };
    const handleCancel = () => {
      setEditUsername(false);
    };
return(
    <>
    <div className="flex items-center">
        {editUsername ? null : (
      <Button
        className=""
        onClick={showModal}
      >
        Edit
      </Button>
      )}
      </div>
      <Modal
        title="Change your Username"
        open={editUsername}
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