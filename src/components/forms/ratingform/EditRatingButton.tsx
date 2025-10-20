/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import { useState } from "react"
import { Modal, Button } from "antd"
import EditRatingForm from "./EditRatingForm"
import EditAnthologyRatingForm from "./EditAnthologyRatingForm"
import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"
import { useRouter } from "next/navigation"

type Props = {
  setShowEditRating: React.Dispatch<React.SetStateAction<boolean>>
  showEditRating: boolean
  id: string | string[]
  initialRating: number
  isAnthology: boolean
  shortStoryData: object
  singleBook: Book
  users: User[]
}

const EditRatingButton: React.FC<Props> = ({
  showEditRating,
  setShowEditRating,
  id,
  initialRating,
  isAnthology,
  shortStoryData,
  singleBook,
  users,
}) => {
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const router = useRouter()

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
    router.replace(`/books/library/${id}`)
  }

  return (
    <>
      <div className="flex items-center">
        <Button className="m-5" onClick={showModal} size="large">
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
          <EditRatingForm
            id={id}
            initialRating={initialRating}
            users={users}
            bookTitle={singleBook.title}
          />
        )}
        {showEditRating && isAnthology && (
          <EditAnthologyRatingForm
            id={id}
            shortStoryData={shortStoryData}
            singleBook={singleBook}
          />
        )}
      </Modal>
    </>
  )
}

export default EditRatingButton
