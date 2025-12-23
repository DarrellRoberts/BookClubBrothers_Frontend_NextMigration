"use client"

import { useState } from "react"
import { Button, Modal } from "antd"
import CommentForm from "./CommentForm"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiModal } from "@/components/ui/modal/UiModal"

interface props {
  setAddComment: React.Dispatch<React.SetStateAction<boolean>>
  addComment: boolean
  id: string | string[]
}

const CommentButton: React.FC<props> = ({ setAddComment, addComment, id }) => {
  const showModal = () => {
    setAddComment(true)
  }
  const handleCancel = () => {
    setAddComment(false)
  }

  return (
    <>
      <div className="flex items-center m-5">
        <UiButton clickHandler={() => showModal()} textContent="Add comment" />
      </div>
      <UiModal
        title={"Add Comment"}
        open={addComment}
        handleCancel={handleCancel}
      >
        <CommentForm id={id} handleCancel={handleCancel} />
      </UiModal>
    </>
  )
}

export default CommentButton
