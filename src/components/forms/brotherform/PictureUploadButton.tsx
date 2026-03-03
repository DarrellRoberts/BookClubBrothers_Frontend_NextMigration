"use client"

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
  const showImage = useAppSelector((state) => state.editButtons.showImage)

  const dispatch = useAppDispatch()

  const showModal = () => {
    dispatch(setShowImage())
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
        key={inImage}
        title={"Change your profile picture"}
        open={showImage}
        handleCancel={handleCancel}
      >
        <PictureUpload id={id} inImage={inImage} />
      </UiModal>
    </>
  )
}

export default PictureUploadButton
