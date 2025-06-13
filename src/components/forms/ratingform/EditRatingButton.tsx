/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import { useState } from "react"
import { Modal, Button } from "antd"
import EditRatingForm from "./EditRatingForm"
import EditAnthologyRatingForm from "./EditAnthologyRatingForm"
import { Book } from "@/types/BookInterface"

interface props {
  setShowEditRating: React.Dispatch<React.SetStateAction<boolean>>
  showEditRating: boolean
  id: string | string[]
  initialRating: number
  isAnthology: boolean
  shortStoryData: object
  bookData: Book
}

const EditRatingButton: React.FC<props> = ({
  showEditRating,
  setShowEditRating,
  id,
  initialRating,
  isAnthology,
  shortStoryData,
  bookData,
}) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const showModal = () => {
    setShowEditRating(true)
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setShowEditRating(false)
    }, 4000)
  }
  const handleCancel = () => {
    setShowEditRating(false)
  }

  return (
    <>
      <div className="flex items-center">
        <Button className="m-5" onClick={showModal}>
          Change rating
        </Button>
      </div>
      <Modal
        title="Change Rating"
        open={showEditRating}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        {showEditRating && !isAnthology && (
          <EditRatingForm id={id} initialRating={initialRating} />
        )}
        {showEditRating && isAnthology && (
          <EditAnthologyRatingForm
            id={id}
            shortStoryData={shortStoryData}
            bookData={bookData}
          />
        )}
      </Modal>
    </>
  )
}

export default EditRatingButton
