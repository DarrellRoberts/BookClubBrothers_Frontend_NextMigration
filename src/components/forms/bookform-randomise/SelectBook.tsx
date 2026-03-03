import { Form } from "antd"
import { API_SELECT_BOOK, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { Book } from "@/types/BookInterface"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { SelectBookPayload } from "@/types/Api"

type Props = {
  bookId: string
}

const SelectBook: React.FC<Props> = ({ bookId }) => {
  const toastObject = {
    success: {
      title: "Book successfully added to book library",
      description: "Get reading",
    },
    error: {
      title: "Error occurred",
      description: "Book not selected. Please contact me",
    },
  }

  const { mutate, isPending, isError } = useMutationQuery<
    SelectBookPayload,
    Book
  >({
    apiPath: `${API_SELECT_BOOK}${bookId}`,
    method: "put",
    toastObject: toastObject,
    queryKeyToInvalidate: ["unread books", "books"],
    onSuccessCallback: () => null,
  })

  const onSubmit = () => {
    mutate({
      read: true,
      dateOfMeeting: Date.now(),
    })
  }

  return (
    <>
      <Form onFinish={onSubmit}>
        <UiButton
          type="primary"
          textContent="Select"
          htmlType="submit"
          loading={isPending}
          disabled={isError}
        />
      </Form>
    </>
  )
}

export default SelectBook
