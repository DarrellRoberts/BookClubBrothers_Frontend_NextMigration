"use client"

import { Button, Popconfirm } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { config } from "@/configs/config"

type Props = {
  id: string | string[]
}

const DeleteBook: React.FC<Props> = ({ id }) => {
  const { handleSubmit, error } = useForm(
    `${config.API_URL}/books/${id}`,
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
