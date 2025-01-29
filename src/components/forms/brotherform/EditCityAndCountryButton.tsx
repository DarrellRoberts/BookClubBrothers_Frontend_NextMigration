/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client";

import { Modal, Button } from "antd";
import { useState } from "react";
import EditCityAndCountry from "./EditCityAndCountry";

type ActionType = {
  type: string;
};

interface props {
  dispatch: React.Dispatch<ActionType>;
  showCountry: boolean;
  id: string;
  inCountry: string;
  inCity: string;
}

const EditCityAndCountryButton: React.FC<props> = ({
  dispatch,
  showCountry,
  id,
  inCountry,
  inCity,
}) => {
  const [modalText, setModalText] = useState(
    <EditCityAndCountry id={id} inCountry={inCountry} inCity={inCity} />
  );
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

  const showModal = () => {
    dispatch({ type: "toggleCountry" });
  };
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch({ type: "toggleCountry" });
    }, 4000);
    setModalText(
      <EditCityAndCountry id={id} inCountry={inCountry} inCity={inCity} />
    );
  };
  const handleCancel = () => {
    dispatch({ type: "toggleCountry" });
  };
  return (
    <>
      <Button className="" onClick={showModal}>
        Edit
      </Button>
      <Modal
        title="Change your Country and City"
        open={showCountry}
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

export default EditCityAndCountryButton;
