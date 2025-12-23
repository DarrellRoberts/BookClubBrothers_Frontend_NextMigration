"use client"

import { Modal, Button } from "antd"
import EditRatingForm from "./EditRatingForm"
import EditAnthologyRatingForm from "./EditAnthologyRatingForm"
import { Book } from "@/types/BookInterface"
import { User } from "@/types/UserInterface"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiModal } from "@/components/ui/modal/UiModal"

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
      <div className="flex items-center m-5">
        <UiButton
          clickHandler={() => showModal()}
          textContent="Change rating"
        />
      </div>
      <UiModal
        title={"Change Rating"}
        open={showEditRating}
        handleCancel={handleCancel}
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
      </UiModal>
    </>
  )
}

export default EditRatingButton
