/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import { Modal, Button } from "antd"
import { useState } from "react"
import EditCityAndCountry from "./EditCityAndCountry"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setShowCountry } from "@/store/lib/features/auth/editButtonsSlice"

type Props = {
  id: string
  inCountry: string
  inCity: string
}

const EditCityAndCountryButton: React.FC<Props> = ({
  id,
  inCountry,
  inCity,
}) => {
  const [modalText, setModalText] = useState(
    <EditCityAndCountry id={id} inCountry={inCountry} inCity={inCity} />
  )
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const showCountry = useAppSelector((state) => state.editButtons.showCountry)
  const dispatch = useAppDispatch()

  const showModal = () => {
    dispatch(setShowCountry())
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      dispatch(setShowCountry())
    }, 4000)
    setModalText(
      <EditCityAndCountry id={id} inCountry={inCountry} inCity={inCity} />
    )
  }
  const handleCancel = () => {
    dispatch(setShowCountry())
  }
  return (
    <>
      <Button className="" onClick={showModal} size="large">
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
  )
}

export default EditCityAndCountryButton
