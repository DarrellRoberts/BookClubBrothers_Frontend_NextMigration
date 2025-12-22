"use client"

import { Button, Popconfirm } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch } from "@/store/lib/hooks"
import { setIsRefresh } from "@/store/lib/features/auth/editButtonsSlice"
import { UiButton } from "@/components/ui/button/UiButton"

type Props = {
  id: string
}

const DeleteBook: React.FC<Props> = ({ id }) => {
  const { handleSubmit, error } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    "DELETE"
  )

  const dispatch = useAppDispatch()

  const confirm = () =>
    new Promise((resolve) => {
      handleSubmit()
      dispatch(setIsRefresh(true))
      setTimeout(() => {
        resolve(null)
        dispatch(setIsRefresh(false))
        // document.location.reload()
      }, 3000)
    })
  return (
    <>
      <Popconfirm
        className="deleteProfile"
        title="WARNING"
        description="Are you sure you want to delete this book?"
        onConfirm={confirm}
      >
        <UiButton
          bgColor="darkred"
          hoverBgColor="red"
          textContent="Delete Book"
        />
      </Popconfirm>
      {error ? (
        <div className="authorisationMessage">
          <h2>{error}</h2>
        </div>
      ) : null}
    </>
  )
}

export default DeleteBook
