/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Button, Modal } from "antd";
import { useState } from "react";
import PictureUpload from "./PictureUpload";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setShowImage } from "@/store/lib/features/auth/editButtonsSlice";

type Props = {
  id: string;
  inImage: string;
};

const PictureUploadButton: React.FC<Props> = ({ id, inImage }) => {
  const [modalText, setModalText] = useState(
    <PictureUpload id={id} inImage={inImage} />
  );
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const showImage = useAppSelector((state) => state.editButtons.showImage);

  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(setShowImage());
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(setShowImage());
    }, 4000);
    setModalText(<PictureUpload id={id} inImage={inImage} />);
  };
  const handleCancel = () => {
    dispatch(setShowImage());
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
