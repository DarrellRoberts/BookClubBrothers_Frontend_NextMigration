"use client"

import { useEffect, useState } from "react"
import { Modal, Button } from "antd"
import RatingForm from "./RatingForm"
import { Book } from "@/types/BookInterface"
import AnthologyRatingForm from "./AnthologyRatingForm"
import { User } from "@/types/UserInterface"
import { useRouter } from "next/navigation"
import { UiButton } from "@/components/ui/button/UiButton"
import { UiModal } from "@/components/ui/modal/UiModal"

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
  const [modalText, setModalText] = useState(null)

  const showModal = () => {
    setShowRating(true)
  }

  const handleCancel = () => {
    setShowRating(false)
  }

  useEffect(() => {
    if (isAnthology) {
      setModalText(<AnthologyRatingForm singleBook={singleBook} id={id} />)
    } else {
      setModalText(
        <RatingForm
          id={id}
          users={users}
          bookTitle={singleBook.title}
          handleCancel={handleCancel}
        />
      )
    }
  }, [])
  return (
    <>
      <div className="flex items-center m-5">
        <UiButton
          clickHandler={() => showModal()}
          textContent="Submit rating"
        />
      </div>
      <UiModal
        title={"Submit Rating"}
        open={showRating}
        handleCancel={handleCancel}
      >
        {isAnthology ? (
          <AnthologyRatingForm singleBook={singleBook} id={id} />
        ) : (
          <RatingForm
            id={id}
            users={users}
            bookTitle={singleBook.title}
            handleCancel={handleCancel}
          />
        )}
      </UiModal>
    </>
  )
}

export default RatingButton
