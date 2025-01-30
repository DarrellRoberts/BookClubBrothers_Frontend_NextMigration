/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client";

import { Button, Modal } from "antd";
import { useState } from "react";
import EditGenre from "./EditGenre";
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks";
import { setShowGenre } from "@/store/lib/features/auth/editButtonsSlice";

type Props = {
  id: string;
  inGenre: string[] | null;
};

const EditGenreButton: React.FC<Props> = ({ id, inGenre }) => {
  const [modalText, setModalText] = useState(
    <EditGenre id={id} inGenre={inGenre} />
  );
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);
  const showGenre = useAppSelector((state) => state.editButtons.showGenre);
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(setShowGenre());
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(setShowGenre());
    }, 4000);
    setModalText(<EditGenre id={id} inGenre={inGenre} />);
  };
  const handleCancel = () => {
    dispatch(setShowGenre());
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
