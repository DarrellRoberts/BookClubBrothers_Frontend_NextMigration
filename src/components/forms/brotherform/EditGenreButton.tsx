"use client"

import { Modal } from "antd"
import { useState } from "react"
import EditGenre from "./EditGenre"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setShowGenre } from "@/store/lib/features/auth/editButtonsSlice"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiModal } from "@/components/ui/modal/UiModal"

type Props = {
  id: string
  inGenre: string[] | null
}

const EditGenreButton: React.FC<Props> = ({ id, inGenre }) => {
  const [modalText, setModalText] = useState(
    <EditGenre id={id} inGenre={inGenre} />
  )
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const showGenre = useAppSelector((state) => state.editButtons.showGenre)
  const dispatch = useAppDispatch()

  const showModal = () => {
    dispatch(setShowGenre())
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      dispatch(setShowGenre())
    }, 500)
    setModalText(<EditGenre id={id} inGenre={inGenre} />)
  }
  const handleCancel = () => {
    dispatch(setShowGenre())
  }
  return (
    <>
      <div className="flex items-center">
        {showGenre ? null : (
          <UiButton clickHandler={() => showModal()} textContent="Edit" />
        )}
      </div>
      <UiModal
        title={"Add your favourite Genres"}
        open={showGenre}
        handleCancel={handleCancel}
        handleOk={handleOk}
        confirmLoading={confirmLoading}
      >
        {modalText}
      </UiModal>
    </>
  )
}

export default EditGenreButton
