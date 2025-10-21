/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
"use client"

import { Button, Popconfirm } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"

type Props = {
  id: string | string[]
}

const DeleteBook: React.FC<Props> = ({ id }) => {
  const { handleSubmit, error } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${id}`,
    "DELETE"
  )

  const confirm = () =>
    new Promise((resolve) => {
      handleSubmit()
      setTimeout(() => {
        resolve(null)

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
        <Button className="deleteButton" size="large" danger>
          Delete Book
        </Button>
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
