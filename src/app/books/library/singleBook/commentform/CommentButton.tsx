import {useState} from "react"
import { Button, Modal } from "antd"
import CommentForm from "./CommentForm"

interface props {
    setAddComment: React.Dispatch<React.SetStateAction<boolean>>,
    addComment: boolean,
    id: string
}

const CommentButton: React.FC<props> = ({setAddComment, addComment, id}) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const [modalText, setModalText] = useState(<CommentForm id={id} />)

  const showModal = () => {
    setAddComment(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
    setAddComment(false);
    setModalText(<CommentForm id={id}/>)
    }, 4000);
  };
  const handleCancel = () => {
    setAddComment(false);
  };

return(
    <>
<div className="flex items-center">
      <Button
        className="m-5"
        onClick={showModal}
      >
        Add Comment
      </Button>
      </div>
      <Modal
        title="Add Comment"
        open={addComment}
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

export default CommentButton