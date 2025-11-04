"use client"

import { Modal, Button } from "antd"
import EditRatingForm from "./EditRatingForm"
import EditAnthologyRatingForm from "./EditAnthologyRatingForm"
import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"

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

  const showModal = () => {
    setShowEditRating(true)
  }
  const handleCancel = () => {
    setShowEditRating(false)
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
        onCancel={handleCancel}
        footer={null}
      >
        {showEditRating && !isAnthology && (
          <EditRatingForm
            id={id}
            initialRating={initialRating}
            users={users}
            bookTitle={singleBook.title}
            handleCancel={handleCancel}
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
