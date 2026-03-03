import { Form } from "antd"
import React, { useEffect, useState } from "react"
import EditAuthorForm from "./author/EditAuthorForm"
import EditTitleForm from "./title/EditTitleForm"
import EditPublishedForm from "./published/EditPublishedForm"
import EditPagesForm from "./pages/EditPagesForm"
import EditGenreForm from "./genre/EditGenreForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { setShowEdit } from "@/store/lib/features/auth/editButtonsSlice"
import { API_EDIT_BOOK, config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { Book } from "@/types/BookInterface"
import { EditBookPayload } from "@/types/Api"

type Props = {
  inAuthor: string
  inTitle: string
  inPublished: number
  inPages: number
  inGenre: string[]
  inImage: string
  id: string
}

const EditForm: React.FC<Props> = ({
  inAuthor,
  inTitle,
  inPublished,
  inPages,
  inGenre,
  inImage,
  id,
}) => {
  const [inputError, setInputError] = useState(null)
  const [errorObject, setErrorObject] = useState({
    title: false,
    author: false,
    yearPublished: false,
    pages: false,
  })

  const toastObject = {
    success: {
      title: "Book successfully edited",
      description: "The book is now updated",
    },
    error: {
      title: "Error occurred",
      description: "Book not successfully edited. Please contact me",
    },
  }

  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  const { mutate, isPending, isError, error } = useMutationQuery<
    EditBookPayload,
    Book
  >({
    apiPath: `${API_EDIT_BOOK}/${id}`,
    method: "put",
    toastObject: toastObject,
    queryKeyToInvalidate: ["unread books"],
    onSuccessCallback: () => {
      dispatch(setShowEdit())
    },
  })

  const onSubmit = () => {
    mutate(formData)
  }

  useEffect(() => {
    dispatch(
      setFormData({
        ...formData,
        title: inTitle,
        author: inAuthor,
        yearPublished: inPublished,
        pages: inPages,
        genre: inGenre[0],
        imageURL: inImage,
      }),
    )
    setErrorObject({
      ...errorObject,
      title: true,
      author: true,
      yearPublished: true,
      pages: true,
    })
  }, [])

  useEffect(() => {
    if (Object.values(errorObject).some((value) => value === false)) {
      setInputError("Please check all required fields are correct")
    } else {
      setInputError(null)
    }
  }, [errorObject])
  return (
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
        title: inTitle,
        author: inAuthor,
        yearPublished: inPublished,
        pages: inPages,
        genre: inGenre,
      }}
    >
      <EditTitleForm
        errorObject={errorObject}
        setErrorObject={setErrorObject}
      />
      <EditAuthorForm
        errorObject={errorObject}
        setErrorObject={setErrorObject}
      />
      <EditPublishedForm
        errorObject={errorObject}
        setErrorObject={setErrorObject}
      />
      <EditPagesForm
        errorObject={errorObject}
        setErrorObject={setErrorObject}
      />
      <EditGenreForm />
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <UiButton
          textContent={"Submit"}
          htmlType="submit"
          disabled={isError}
          loading={isPending}
          ghost
        />
        {inputError ? <h4 className="errorH">{inputError}</h4> : null}
      </Form.Item>
    </Form>
  )
}

export default EditForm
