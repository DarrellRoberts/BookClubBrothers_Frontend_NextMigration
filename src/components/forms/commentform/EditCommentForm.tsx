/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
"use client"

import { Button, Form, Input } from "antd"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"

const { TextArea } = Input

type Props = {
  id: string | string[]
  inComment: string
}

const EditCommentForm: React.FC<Props> = ({ id, inComment }) => {
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
          <Button
            type="primary"
            ghost
            className="loginButtons"
            loading={loadings}
            onClick={() => enterLoading()}
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

export default EditCommentForm
