import { Modal, Button } from "antd"
import { useState } from "react"
import EditCityAndCountry from "./EditCityAndCountry"

interface props {
    setEditCountry: React.Dispatch<React.SetStateAction<boolean>>,
    editCountry: boolean,
    id: string,
    inCountry: string,
    inCity: string
}

const EditCityAndCountryButton: React.FC<props> = ({
  setEditCountry, 
  editCountry, 
  id, 
  inCountry, 
  inCity
}) => {
  const [modalText, setModalText] = useState(<EditCityAndCountry id={id} inCountry={inCountry} inCity={inCity}/>)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    setEditCountry(true);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
    setEditCountry(false);
    }, 4000);
    setModalText(<EditCityAndCountry id={id} inCountry={inCountry} inCity={inCity} />)
  };
  const handleCancel = () => {
    setEditCountry(false);
  };
return(
    <>
      <Button
        className=""
        onClick={showModal}
      >
        Edit
      </Button>
      <Modal
        title="Change your Country and City"
        open={editCountry}
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

export default EditCityAndCountryButton