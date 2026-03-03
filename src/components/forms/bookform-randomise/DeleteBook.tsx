"use client"

import { ConfigProvider, Popconfirm } from "antd"
import { API_BOOK_DELETE } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"

type Props = {
  id: string
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
    queryKeyToInvalidate: ["unread books"],
    onSuccessCallback: () => null,
  })

  const onSubmit = () => {
    mutate()
  }

  const confirm = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
        onSubmit()
      }, 1000)
    })

  const popTheme = {
    components: {
      Popconfirm: {
        colorText: "black",
        colorTextHeading: "black",
        colorBg: "black",
      },
    },
  }
  return (
    <ConfigProvider theme={popTheme}>
      <Popconfirm
        title="WARNING"
        description="Are you sure you want to delete this book?"
        onConfirm={confirm}
        disabled={isError}
      >
        <div>
          <UiButton
            bgColor="darkred"
            hoverBgColor="red"
            textContent="Delete Book"
            loading={isPending}
          />
        </div>
      </Popconfirm>
      {isError ? (
        <div className="authorisationMessage">
          <h2>{error.message}</h2>
        </div>
      ) : null}
    </ConfigProvider>
  )
}

export default DeleteBook
