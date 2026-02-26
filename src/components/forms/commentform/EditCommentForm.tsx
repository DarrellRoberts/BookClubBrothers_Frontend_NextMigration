"use client"

import { Form, Input } from "antd"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { API_EDIT_COMMENT, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import { InputConfigWrapper } from "../InputConfigWrapper"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { Book } from "@/types/BookInterface"
import { EditCommentPayload } from "@/types/Api"

const { TextArea } = Input

type Props = {
  id: string
  inComment: string
  handleCancel: () => void
}

const EditCommentForm: React.FC<Props> = ({ id, inComment, handleCancel }) => {
  const comments = useAppSelector(
    (state) => state.bookFormData.formData.commentInfo.comments,
  )
  const commentsInfo = useAppSelector(
    (state) => state.bookFormData.formData.commentInfo,
  )
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const toastObject = {
    success: {
      title: "Comment successfully edited",
      description: "Comment has been changed",
    },
    error: {
      title: "Error occurred",
      description: "Comment not edited. Please contact me",
    },
  }

  const { mutate, isPending, isError, error } = useMutationQuery<
    EditCommentPayload,
    Book
  >({
    apiPath: `${API_EDIT_COMMENT}${id}`,
    method: "put",
    toastObject: toastObject,
    queryKeyToInvalidate: ["books", id],
    onSuccessCallback: () => {
      handleCancel()
    },
  })

  const onSubmit = () => {
    mutate(commentsInfo)
  }

  return (
    <>
      <Form
        onFinish={onSubmit}
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
        <InputConfigWrapper>
          <Form.Item label="Comment" name="comments">
            <TextArea
              rows={8}
              placeholder="Say a few words about the book"
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    commentInfo: { comments: e.target.value },
                  }),
                )
              }
              value={comments}
            />
          </Form.Item>
        </InputConfigWrapper>

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
            loading={isPending}
            disabled={isError}
            htmlType="submit"
          />
          {isError ? <h4 className="errorH">{error.message}</h4> : null}
        </Form.Item>
      </Form>
    </>
  )
}

export default EditCommentForm
