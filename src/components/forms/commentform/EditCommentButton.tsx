"use client"

import { useState } from "react"
import { Modal, Button } from "antd"
import EditCommentForm from "./EditCommentForm"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiModal } from "@/components/ui/modal/UiModal"

interface props {
  setShowEditComment: React.Dispatch<React.SetStateAction<boolean>>
  showEditComment: boolean
  id: string | string[]
  inComment: string
}

const EditRatingButton = ({
  showEditComment,
  setShowEditComment,
  id,
  inComment,
}) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const showModal = () => {
    setShowEditComment(true)
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setShowEditComment(false)
    }, 4000)
  }
  const handleCancel = () => {
    setShowEditComment(false)
  }
  return (
    <>
      <div className="flex items-center m-5">
        <UiButton clickHandler={() => showModal()} textContent="Edit comment" />
      </div>
      <UiModal
        title={"Change Comment"}
        open={showEditComment}
        handleCancel={handleCancel}
      >
        <EditCommentForm
          id={id}
          inComment={inComment}
          handleCancel={handleCancel}
        />
      </UiModal>
    </>
  )
}

export default EditRatingButton
