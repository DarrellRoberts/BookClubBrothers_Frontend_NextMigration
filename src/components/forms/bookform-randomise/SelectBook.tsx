import { Button, Form } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"

type Props = {
  bookId: string
}

const SelectBook: React.FC<Props> = ({ bookId }) => {
  const { handleSubmit, loadings } = useForm(
    `${config.API_URL}/books/${bookId}`,
    "PUT",
    {
      read: true,
      dateOfMeeting: Date.now(),
    }
  )

  return (
    <>
      <Form onFinish={handleSubmit}>
        <UiButton
          type="primary"
          textContent="Select"
          htmlType="submit"
          loading={loadings}
        />
      </Form>
    </>
  )
}

export default SelectBook
