import { Button, Modal } from "antd"
import { useState } from "react"
import EditGenre from "./EditGenre"

interface props {
    setEditGenre: React.Dispatch<React.SetStateAction<boolean>>,
    editGenre: boolean,
    id: string,
    inGenre: [string] | null
}

const EditGenreButton: React.FC<props> = ({
  setEditGenre, 
  editGenre, 
  id, 
  inGenre}) => {
    const [modalText, setModalText] = useState(<EditGenre id={id} inGenre={inGenre} />)
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  
    const showModal = () => {
        setEditGenre(true);
      };
      const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
        setEditGenre(false);
        }, 4000);
        setModalText(<EditGenre id={id} inGenre={inGenre} />)
      };
      const handleCancel = () => {
        setEditGenre(false);
    };
return(
    <>
    <div className="flex items-center">
        {editGenre ? null : (
      <Button
        className=""
        onClick={showModal}
      >
        Edit
      </Button>
      )}
      </div>
      <Modal
        title="Add your favourite Genres"
        open={editGenre}
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

export default EditGenreButton