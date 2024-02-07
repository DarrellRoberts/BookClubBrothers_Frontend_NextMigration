import {useState} from "react"
import {Modal, Button} from "antd"
import RatingForm from "./RatingForm"

interface props {
    setShowRating: React.Dispatch<React.SetStateAction<boolean>>
    showRating: boolean
    id: string
}

const RatingButton: React.FC<props> = ({showRating, setShowRating, id}) => {
const [modalText, setModalText] = useState(<RatingForm id={id} />)
const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

const showModal = () => {
    setShowRating(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
    setShowRating(false);
    }, 4000);
    setModalText(<RatingForm id={id}/>)
  };
  const handleCancel = () => {
    setShowRating(false);
  };
return (
<>
<div className="flex items-center">
      <Button
        className="m-5"
        onClick={showModal}
      >
        Submit rating
      </Button>
      </div>
      <Modal
        title="Submit Rating"
        open={showRating}
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

export default RatingButton