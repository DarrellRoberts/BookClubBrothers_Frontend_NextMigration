"use client"

import { Button, Form, Input } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { UiButton } from "@/components/ui/button/UiButton"

const { TextArea } = Input

type Props = {
  id: string | string[]
  inComment: string
  handleCancel: () => void
}

const EditCommentForm: React.FC<Props> = ({ id, inComment, handleCancel }) => {
  const comments = useAppSelector(
    (state) => state.bookFormData.formData.commentInfo.comments
  )
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { handleSubmit, error, enterLoading, loadings } = useForm(
    `https://bookclubbrothers-backend.onrender.com/books/comment/edit/${id}`,
    "PUT",
    { comments }
  )

  const handleLoadings = () => {
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
        initialValues={{
          comments: inComment,
        }}
      >
        {/* comment */}
        <Form.Item label="Comment" name="comments">
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
          <UiButton
            textContent="Submit"
            ghost
            loading={loadings}
            clickHandler={() => handleLoadings()}
            htmlType="submit"
          />
          {error ? <h4 className="errorH">{error}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditCommentForm
