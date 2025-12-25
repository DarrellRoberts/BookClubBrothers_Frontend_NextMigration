"use client"

import { Modal } from "antd"
import { useState } from "react"
import PictureUpload from "./PictureUpload"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setShowImage } from "@/store/lib/features/auth/editButtonsSlice"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiModal } from "@/components/ui/modal/UiModal"

type Props = {
  id: string
  inImage: string
}

const PictureUploadButton: React.FC<Props> = ({ id, inImage }) => {
  const [modalText, setModalText] = useState(
    <PictureUpload id={id} inImage={inImage} />
  )
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const showImage = useAppSelector((state) => state.editButtons.showImage)

  const dispatch = useAppDispatch()

  const showModal = () => {
    dispatch(setShowImage())
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      dispatch(setShowImage())
    }, 500)
    setModalText(<PictureUpload id={id} inImage={inImage} />)
  }
  const handleCancel = () => {
    dispatch(setShowImage())
  }
  return (
    <>
      <div className="flex items-center">
        <UiButton clickHandler={() => showModal()} textContent="Change Image" />
      </div>
      <UiModal
        title={"Change your profile picture"}
        open={showImage}
        handleCancel={handleCancel}
        handleOk={handleOk}
        confirmLoading={confirmLoading}
      >
        {modalText}
      </UiModal>
    </>
  )
}

export default PictureUploadButton
