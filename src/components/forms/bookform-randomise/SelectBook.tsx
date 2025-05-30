/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { Button, Form } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"

type Props = {
  bookId: string
}

const SelectBook: React.FC<Props> = ({ bookId }) => {
  const { handleSubmit, enterLoading, loadings } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/${bookId}`,
    "PUT",
    {
      read: true,
      dateOfMeeting: Date.now(),
    }
  )

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Button
          loading={loadings}
          onClick={() => enterLoading()}
          htmlType="submit"
        >
          Select
        </Button>
      </Form>
    </>
  )
}

export default SelectBook
