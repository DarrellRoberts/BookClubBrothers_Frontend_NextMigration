"use client"

import { Button, Form, Input } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { config } from "@/configs/config"

const { TextArea } = Input

type Props = {
  id: string | string[]
  handleCancel: () => void
}

const CommentForm = ({ id, handleCancel }: Props) => {
  const comments = useAppSelector(
    (state) => state.bookFormData.formData.commentInfo.comments
  )
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `${config.API_URL}/books/comment/${id}`,
    "POST",
    { comments }
  )

  const handleLoading = () => {
    enterLoading()
    setTimeout(() => {
      handleCancel()
    }, 4000)
  }

  return (
    <>
      <Form
        onFinish={handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
      >
        {/* comment */}
        <Form.Item label="Comment" name="comment">
          <TextArea
            rows={8}
            placeholder="Say a few words about the book"
            onChange={(e) =>
              dispatch(
                setFormData({
                  ...formData,
                  commentInfo: { comments: e.target.value },
                })
              )
            }
            value={comments}
          />
        </Form.Item>

        {/* Submission */}
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            ghost
            className="loginButtons"
            loading={loadings}
            onClick={() => handleLoading()}
            htmlType="submit"
            size="large"
          >
            Submit
          </Button>
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default CommentForm
