"use client"

import { Button, Popconfirm } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"

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
      }, 1250)
    })
  return (
    <div className="m-5">
      <Popconfirm
        className="deleteProfile"
        title="WARNING"
        description="Are you sure you want to delete this book?"
        onConfirm={confirm}
      >
        <UiButton
          textContent="Delete Book"
          bgColor="darkred"
          hoverBgColor="red"
        />
      </Popconfirm>
      {error ? (
        <div className="authorisationMessage">
          <h2>{error}</h2>
        </div>
      ) : null}
    </div>
  )
}

export default DeleteBook
