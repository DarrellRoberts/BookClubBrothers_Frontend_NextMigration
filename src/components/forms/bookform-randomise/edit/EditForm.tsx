import { Form } from "antd"
import React, { useEffect, useState } from "react"
import EditAuthorForm from "./author/EditAuthorForm"
import EditTitleForm from "./title/EditTitleForm"
import EditPublishedForm from "./published/EditPublishedForm"
import EditPagesForm from "./pages/EditPagesForm"
import EditGenreForm from "./genre/EditGenreForm"
import EditImageURLForm from "./imageURL/EditImageURLForm"
import useForm from "@/hooks/crud-hooks/useForm"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { setShowEdit } from "@/store/lib/features/auth/editButtonsSlice"
import { config } from "@/configs/config"
import { UiButton } from "@/components/ui/button/UiButton"

type Props = {
  inAuthor: string
  inTitle: string
  inPublished: number
  inPages: number
  inImageURL: string
  inGenre: string[]
  id: string
}

const EditForm: React.FC<Props> = ({
  inAuthor,
  inTitle,
  inPublished,
  inPages,
  inGenre,
  inImageURL,
  id,
}) => {
  const [inputError, setInputError] = useState(null)
  const [errorObject, setErrorObject] = useState({
    title: false,
    author: false,
    yearPublished: false,
    pages: false,
    imageURL: false,
  })
  const { handleSubmit, error, loadings, enterLoading } = useForm(
    `${config.API_URL}/books/${id}`,
    "PUT"
  )

  const handleForm = () => {
    if (inputError) return
    enterLoading()
    setTimeout(() => dispatch(setShowEdit()), 1250)
  }
  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(
      setFormData({
        ...formData,
        title: inTitle,
        author: inAuthor,
        yearPublished: inPublished,
        pages: inPages,
        genre: inGenre[0],
        imageURL: inImageURL,
      })
    )
    setErrorObject({
      ...errorObject,
      title: true,
      author: true,
      yearPublished: true,
      pages: true,
      imageURL: true,
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
        title: inTitle,
        author: inAuthor,
        yearPublished: inPublished,
        pages: inPages,
        genre: inGenre,
        imageURL: inImageURL,
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
      <EditImageURLForm
        errorObject={errorObject}
        setErrorObject={setErrorObject}
      />
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <UiButton
          textContent={"Submit"}
          htmlType="submit"
          clickHandler={() => handleForm()}
          loading={loadings}
          ghost
        />
        {inputError ? <h4 className="errorH">{inputError}</h4> : null}
      </Form.Item>
    </Form>
  )
}

export default EditForm
