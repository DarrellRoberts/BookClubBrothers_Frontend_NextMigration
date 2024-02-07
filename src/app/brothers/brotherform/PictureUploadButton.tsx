import { Button, Modal } from "antd"
import { useState } from "react"
import PictureUpload from "./PictureUpload"

interface props {
    setImageUpload: React.Dispatch<React.SetStateAction<boolean>>,
    imageUpload: boolean,
    id: string,
    inImage: string
}

const PictureUploadButton: React.FC<props> = ({
  setImageUpload, 
  imageUpload, 
  id, 
  inImage}) => {
  const [modalText, setModalText] = useState(<PictureUpload id={id} inImage={inImage} />)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
      setImageUpload(true);
    };
    const handleOk = () => {
      setConfirmLoading(true);
      setTimeout(() => {
      setImageUpload(false);
      }, 4000);
      setModalText(<PictureUpload id={id} inImage={inImage} />)
    };
    const handleCancel = () => {
      setImageUpload(false);
    };
return(
    <>
    <div className="flex items-center">
      <Button
        className=""
        onClick={showModal}
      >
        Change image
      </Button>
      </div>
      <Modal
        title="Change your profile picture"
        open={imageUpload}
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

export default PictureUploadButton