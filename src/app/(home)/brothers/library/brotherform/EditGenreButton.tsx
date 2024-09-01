/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Button, Modal } from "antd";
import { useState } from "react";
import EditGenre from "./EditGenre";

type ActionType = {
  type: string;
};

interface props {
  dispatch: React.Dispatch<ActionType>;
  showGenre: boolean;
  id: string;
  inGenre: [string] | null;
}

const EditGenreButton: React.FC<props> = ({
  dispatch,
  showGenre,
  id,
  inGenre,
}) => {
  const [modalText, setModalText] = useState(
    <EditGenre id={id} inGenre={inGenre} />
  );
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    dispatch({ type: "toggleGenre" });
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch({ type: "toggleGenre" });
    }, 4000);
    setModalText(<EditGenre id={id} inGenre={inGenre} />);
  };
  const handleCancel = () => {
    dispatch({ type: "toggleGenre" });
  };
  return (
    <>
      <div className="flex items-center">
        {showGenre ? null : (
          <Button className="" onClick={showModal}>
            Edit
          </Button>
        )}
      </div>
      <Modal
        title="Add your favourite Genres"
        open={showGenre}
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

export default EditGenreButton;
