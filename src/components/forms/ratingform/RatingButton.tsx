/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import { useEffect, useState } from "react"
import { Modal, Button } from "antd"
import RatingForm from "./RatingForm"
import { Book } from "@/types/BookInterface"
import AnthologyRatingForm from "./AnthologyRatingForm"
import { User } from "@/types/UserInterface"

type Props = {
  setShowRating: React.Dispatch<React.SetStateAction<boolean>>
  showRating: boolean
  id: string | string[]
  singleBook: Book
  isAnthology: boolean
  users: User[]
}

const RatingButton: React.FC<Props> = ({
  showRating,
  setShowRating,
  id,
  isAnthology,
  singleBook,
  users,
}) => {
  const [modalText, setModalText] = useState(
    <RatingForm id={id} users={users} bookTitle={singleBook.title} />
  )
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)

  const showModal = () => {
    setShowRating(true)
  }
  const handleOk = () => {
    setConfirmLoading(true)
    setTimeout(() => {
      setShowRating(false)
    }, 4000)
    setModalText(
      <RatingForm id={id} users={users} bookTitle={singleBook.title} />
    )
  }
  const handleCancel = () => {
    setShowRating(false)
  }

  useEffect(() => {
    if (isAnthology) {
      setModalText(<AnthologyRatingForm singleBook={singleBook} id={id} />)
    }
  }, [])
  return (
    <>
      <div className="flex items-center">
        <Button className="m-5" onClick={showModal} size="large">
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
        {isAnthology ? (
          <AnthologyRatingForm singleBook={singleBook} id={id} />
        ) : (
          <RatingForm id={id} users={users} bookTitle={singleBook.title} />
        )}
      </Modal>
    </>
  )
}

export default RatingButton
