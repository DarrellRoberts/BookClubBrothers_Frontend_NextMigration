"use client"

import { Popconfirm } from "antd"
import { API_BOOK_DELETE } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"

type Props = {
  id: string | string[]
}

const DeleteBook: React.FC<Props> = ({ id }) => {
  const toastObject = {
    success: {
      title: "Book successfully deleted",
      description: "Bon voyage to whatever book you deleted",
    },
    error: {
      title: "Error occurred",
      description: "Book unable to delete. Please contact me",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<void, any>({
    apiPath: `${API_BOOK_DELETE}/${id}`,
    method: "delete",
    toastObject: toastObject,
    queryKeyToInvalidate: ["books"],
    onSuccessCallback: () => null,
  })

  const onSubmit = () => {
    mutate()
  }
  return (
    <div className="m-5">
      <Popconfirm
        className="deleteProfile"
        title="WARNING"
        description="Are you sure you want to delete this book?"
        onConfirm={onSubmit}
        disabled={isError}
      >
        <UiButton
          textContent="Delete Book"
          bgColor="darkred"
          hoverBgColor="red"
          loading={isPending}
        />
      </Popconfirm>
      {isError ? (
        <div className="authorisationMessage">
          <h2>{error.message}</h2>
        </div>
      ) : null}
    </div>
  )
}

export default DeleteBook
