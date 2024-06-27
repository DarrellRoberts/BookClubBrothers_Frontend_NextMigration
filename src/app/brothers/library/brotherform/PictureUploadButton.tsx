/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Button, Modal } from "antd";
import { useState } from "react";
import PictureUpload from "./PictureUpload";

type ActionType = {
  type: string;
};

interface props {
  dispatch: React.Dispatch<ActionType>;
  showImage: boolean;
  id: string;
  inImage: string;
}

const PictureUploadButton: React.FC<props> = ({
  dispatch,
  showImage,
  id,
  inImage,
}) => {
  const [modalText, setModalText] = useState(
    <PictureUpload id={id} inImage={inImage} />
  );
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    dispatch({ type: "toggleImage" });
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch({ type: "toggleImage" });
    }, 4000);
    setModalText(<PictureUpload id={id} inImage={inImage} />);
  };
  const handleCancel = () => {
    dispatch({ type: "toggleImage" });
  };
  return (
    <>
      <div className="flex items-center">
        <Button className="" onClick={showModal}>
          Change image
        </Button>
      </div>
      <Modal
        title="Change your profile picture"
        open={showImage}
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

export default PictureUploadButton;
