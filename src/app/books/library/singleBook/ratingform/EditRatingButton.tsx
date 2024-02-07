import {useState} from "react"
import {Modal, Button} from "antd"
import EditRatingForm from "./EditRatingForm"

interface props {
    setShowEditRating: React.Dispatch<React.SetStateAction<boolean>>
    showEditRating: boolean
    id: string
    initialRating: number
}

const EditRatingButton: React.FC<props> = ({showEditRating, setShowEditRating, id, initialRating}) => {

const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

const showModal = () => {
    setShowEditRating(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
    setShowEditRating(false);
    }, 4000);
  };
  const handleCancel = () => {
    setShowEditRating(false);
  };
return (
<>
<div className="flex items-center">
      <Button
        className="m-5"
        onClick={showModal}
      >
        Change rating
      </Button>
      </div>
      <Modal
        title="Change Rating"
        open={showEditRating}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        {showEditRating && <EditRatingForm id={id} initialRating={initialRating} />}
      </Modal>
</>
    )
}

export default EditRatingButton