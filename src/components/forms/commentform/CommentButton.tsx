/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client"

import { useState } from "react"
import { Button, Modal } from "antd"
import CommentForm from "./CommentForm"

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
      <div className="flex items-center">
        <Button className="m-5" onClick={showModal} size="large">
          Add Comment
        </Button>
      </div>
      <Modal
        title="Add Comment"
        open={addComment}
        onCancel={handleCancel}
        footer={null}
      >
        <CommentForm id={id} handleCancel={handleCancel} />
      </Modal>
    </>
  )
}

export default CommentButton
