import {useState} from "react"
import {Modal, Button} from "antd"
import EditCommentForm from "./EditCommentForm"

interface props {
    setShowEditComment: React.Dispatch<React.SetStateAction<boolean>>
    showEditComment: boolean
    id: string
    inComment: string
}

const EditRatingButton: React.FC<props> = ({showEditComment, setShowEditComment, id, inComment}) => {

const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

const showModal = () => {
    setShowEditComment(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
    setShowEditComment(false);
    }, 4000);
  };
  const handleCancel = () => {
    setShowEditComment(false);
  };
return (
<>
<div className="flex items-center">
      <Button
        className="m-5"
        onClick={showModal}
      >
        Edit comment
      </Button>
      </div>
      <Modal
        title="Change Rating"
        open={showEditComment}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        {showEditComment && <EditCommentForm id={id} inComment={inComment} />}
      </Modal>
</>
    )
}

export default EditRatingButton