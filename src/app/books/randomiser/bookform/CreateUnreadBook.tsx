import {useState} from "react"
import {Modal, Button} from "antd"
import CreateBookForm from "./CreateUnreadBookForm"

interface props {
    setShowCreateBook: React.Dispatch<React.SetStateAction<boolean>>
    showCreateBook: boolean
}

const CreateBook: React.FC<props> = ({setShowCreateBook, showCreateBook}) => {
const [modalText, setModalText] = useState(<CreateBookForm />)
const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

const showModal = () => {
    setShowCreateBook(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
    setShowCreateBook(false);
    }, 4000);
    setModalText(<CreateBookForm />)
  };
  const handleCancel = () => {
    setShowCreateBook(false);
  };
return (
<>
<div className="flex items-center">
      <Button
        className="m-5"
        onClick={showModal}
      >
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