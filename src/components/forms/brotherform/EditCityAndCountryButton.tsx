"use client"

import { Modal } from "antd"
import { useState } from "react"
import EditCityAndCountry from "./EditCityAndCountry"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setShowCountry } from "@/store/lib/features/auth/editButtonsSlice"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiModal } from "@/components/ui/modal/UiModal"

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
    }, 500)
    setModalText(
      <EditCityAndCountry id={id} inCountry={inCountry} inCity={inCity} />
    )
  }
  const handleCancel = () => {
    dispatch(setShowCountry())
  }
  return (
    <>
      <UiButton clickHandler={() => showModal()} textContent="Edit" />
      <UiModal
        title={"Change your Country and City"}
        open={showCountry}
        handleCancel={handleCancel}
        handleOk={handleOk}
        confirmLoading={confirmLoading}
      >
        {modalText}
      </UiModal>
    </>
  )
}

export default EditCityAndCountryButton
