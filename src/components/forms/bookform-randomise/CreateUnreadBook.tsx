/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Dispatch, useState } from "react";
import { Modal, Button } from "antd";
import CreateBookForm from "./CreateUnreadBookForm";
import { ACTIONS } from "../../books/randomiser/actions";

interface props {
  dispatch: Dispatch<unknown>;
  showCreateBook: boolean;
}

const CreateBook: React.FC<props> = ({ dispatch, showCreateBook }) => {
  const [modalText, setModalText] = useState(<CreateBookForm />);
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    dispatch({ type: ACTIONS.SHOWCREATEBOOK, payload: true });
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch({ type: ACTIONS.SHOWCREATEBOOK, payload: false });
    }, 4000);
    setModalText(<CreateBookForm />);
  };
  const handleCancel = () => {
    dispatch({ type: ACTIONS.SHOWCREATEBOOK, payload: false });
  };
  return (
    <>
      <div className="flex items-center">
        <Button className="m-5" onClick={showModal}>
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
  );
};

export default CreateBook;
