import {Dispatch, useState} from "react"
import {Modal, Button} from "antd"
import EditUnreadBookForm from "./EditUnreadBookForm"
import {ACTIONS} from "../page"

interface props {
    showEditBook: boolean
    dispatch: Dispatch<any> 
    id: string,
    prevTitle: string, 
    prevAuthor: string,
    prevPages: number,
    prevYearPublished: number, 
    prevGenre: string[],
    prevImageURL: string
}

const EditUnreadBook: React.FC<props> = (
  {
  showEditBook, 
  dispatch,
  id,
  prevTitle, 
  prevAuthor,
  prevPages,
  prevYearPublished, 
  prevGenre,
  prevImageURL
  }
) => {

const [modalText, setModalText] = useState(
<EditUnreadBookForm 
  id={id}
  prevTitle={prevTitle}
  prevAuthor={prevAuthor}
  prevPages={prevPages}
  prevYearPublished={prevYearPublished}
  prevGenre={prevGenre}
  prevImageURL={prevImageURL}
/>
)
const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

const showModal = () => {
  dispatch({type: ACTIONS.SHOWEDITBOOK, payload: true})
  console.log(id);
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch({type: ACTIONS.SHOWEDITBOOK, payload: false})
    }, 4000);
  };
  const handleCancel = () => {
    dispatch({type: ACTIONS.SHOWEDITBOOK, payload: false})
    console.log(id);
  };
return (
<>
<div className="flex items-center">
      <Button
        className="m-5"
        onClick={showModal}
      >
        Edit book
      </Button>
      </div>
      <Modal
        title="Edit book"
        open={showEditBook}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        {/* <p>{modalText}</p> */}
        <EditUnreadBookForm
            id={id}
            prevTitle={prevTitle}
            prevAuthor={prevAuthor}
            prevPages={prevPages}
            prevYearPublished={prevYearPublished}
            prevGenre={prevGenre}
            prevImageURL={prevImageURL}
        />
      </Modal>
</>
    )
}

export default EditUnreadBook