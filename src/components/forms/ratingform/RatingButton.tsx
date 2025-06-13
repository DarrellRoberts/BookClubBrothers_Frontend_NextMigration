/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import { useEffect, useState } from "react"
import { Modal, Button } from "antd"
import RatingForm from "./RatingForm"
import { Book } from "@/types/BookInterface"
import AnthologyRatingForm from "./AnthologyRatingForm"

interface props {
  setShowRating: React.Dispatch<React.SetStateAction<boolean>>
  showRating: boolean
  id: string | string[]
  bookData: Book
  isAnthology: boolean
}

const RatingButton: React.FC<props> = ({
  showRating,
  setShowRating,
  id,
  isAnthology,
  bookData,
}) => {
  const [modalText, setModalText] = useState(<RatingForm id={id} />)
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const showModal = () => {
    setShowRating(true)
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setShowRating(false)
    }, 4000)
    setModalText(<RatingForm id={id} />)
  }
  const handleCancel = () => {
    setShowRating(false)
  }

  useEffect(() => {
    if (isAnthology) {
      setModalText(<AnthologyRatingForm bookData={bookData} id={id} />)
    }
  }, [])
  return (
    <>
      <div className="flex items-center">
        <Button className="m-5" onClick={showModal}>
          Submit rating
        </Button>
      </div>
      <Modal
        title="Submit Rating"
        open={showRating}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        footer={null}
      >
        {/* <p>{modalText}</p> */}
        <AnthologyRatingForm bookData={bookData} id={id} />
      </Modal>
    </>
  )
}

export default RatingButton
