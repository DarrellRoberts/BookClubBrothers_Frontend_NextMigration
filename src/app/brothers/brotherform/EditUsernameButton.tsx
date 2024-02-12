"use client"

import { Button, Modal } from "antd"
import { useState } from "react"
import EditUsername from "./EditUsername"

type ActionType = {
  type: string
}

interface props {
  dispatch: React.Dispatch<ActionType>,
  showUsername: boolean,
  id: string,
  inUsername: string
}

const EditUsernameButton: React.FC<props> = ({
  dispatch, 
  showUsername, 
  id, 
  inUsername}) => {
  const [modalText, setModalText] = useState(<EditUsername id={id} inUsername={inUsername} />)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    dispatch({ type: 'toggleUsername'});
    };
    const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
      dispatch({ type: 'toggleUsername'});
      }, 4000);
      setModalText(<EditUsername id={id} inUsername={inUsername} />)
    };
    const handleCancel = () => {
      dispatch({ type: 'toggleUsername'});
    };
return(
    <>
    <div className="flex items-center">
        {showUsername ? null : (
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