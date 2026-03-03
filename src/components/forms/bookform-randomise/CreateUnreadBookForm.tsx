import { Form, Input, Space, Select } from "antd"
import { useAppDispatch, useAppSelector } from "@/store/lib/hooks"
import { setFormData } from "@/store/lib/features/books/bookFormDataSlice"
import { useEffect, useState } from "react"
import { setShowCreate } from "@/store/lib/features/auth/editButtonsSlice"
import { API_CREATE_UNREAD, config } from "@/configs/config"
import { InputConfigWrapper } from "../InputConfigWrapper"
import { UiButton } from "@/components/ui/button/UiButton"
import useBookImage from "@/hooks/book-hooks/useBookImage"
import useMutationQuery from "@/hooks/crud-hooks/useMutationQuery"
import { CreateBookPayload } from "@/types/Api"
import { Book } from "@/types/BookInterface"
import { genres } from "@/configs/genre"

const { Option } = Select

const CreateBook: React.FC = () => {
  const [error, setError] = useState<string>("")
  const [errorObject, setErrorObject] = useState({
    title: false,
    author: false,
    yearPublished: false,
    pages: false,
  })

  const toastObject = {
    success: {
      title: "Book successfully added",
      description: "Thank you for your service",
    },
    error: {
      title: "Error occurred",
      description: "Book not added. Please contact me",
    },
  }

  const { mutate, isPending, isError } = useMutationQuery<
    CreateBookPayload,
    Book
  >({
    apiPath: API_CREATE_UNREAD,
    method: "post",
    toastObject: toastObject,
    queryKeyToInvalidate: ["unread books"],
    onSuccessCallback: () => {
      dispatch(setShowCreate())
    },
  })

  const onSubmit = () => {
    mutate(formData)
  }

  const formData = useAppSelector((state) => state.bookFormData.formData)
  const dispatch = useAppDispatch()
  const fetchCoverId = useBookImage()

  const handleSubmitSuggestion = async () => {
    if (!formData.title) return
    const coverUrl = await fetchCoverId(formData.title)
    if (!coverUrl) return
    const finalSubmissionData = { ...formData, imageURL: coverUrl }
    dispatch(setFormData(finalSubmissionData))
  }

  useEffect(() => {
    if (Object.values(errorObject).some((value) => value === false)) {
      setError("Please check all required fields are correct")
    } else {
      setError(null)
    }
  }, [errorObject])
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
          remember: true,
        }}
      >
        <InputConfigWrapper>
          {/* Title */}
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                validator(_, value) {
                  const textRegex = /^[a-zA-Z0-9\s-\s?\s!\s']+$/
                  if (textRegex.test(value) && value?.length < 40) {
                    setErrorObject({ ...errorObject, title: true })
                    return Promise.resolve()
                  }
                  setErrorObject({ ...errorObject, title: false })
                  return Promise.reject()
                },
                message:
                  "Please write the title of the book. No special characters allowed",
              },
            ]}
          >
            <Input
              type="text"
              onBlur={() => handleSubmitSuggestion()}
              onChange={(e) =>
                dispatch(setFormData({ ...formData, title: e.target.value }))
              }
              value={formData["title"]}
            />
          </Form.Item>

          {/* Author */}
          <Form.Item
            label="Author"
            name="author"
            rules={[
              {
                required: true,
                validator(_, value) {
                  const nameRegex = /^[a-zA-Z\s-\s']+$/
                  if (
                    nameRegex.test(value) &&
                    value?.length > 4 &&
                    value?.length < 30
                  ) {
                    setErrorObject({ ...errorObject, author: true })
                    return Promise.resolve()
                  }
                  setErrorObject({ ...errorObject, author: false })
                  return Promise.reject()
                },
                message:
                  "Please write the name of the author. It must be more than 4 characters and no special characters nor numbers are allowed",
              },
            ]}
          >
            <Input
              type="text"
              onChange={(e) =>
                dispatch(setFormData({ ...formData, author: e.target.value }))
              }
              value={formData["author"]}
            />
          </Form.Item>

          <Form.Item
            label="Pages"
            name="pages"
            rules={[
              {
                required: true,
                validator(_, value) {
                  const numberRegex = /^(50|[1-9]\d{2}|1\d{3}|2000)$/
                  if (numberRegex.test(value)) {
                    setErrorObject({ ...errorObject, pages: true })
                    return Promise.resolve()
                  }
                  setErrorObject({ ...errorObject, pages: false })
                  return Promise.reject()
                },
                message: "The number of pages must be between 50 and 2000",
              },
            ]}
          >
            <Input
              type="number"
              onChange={(e) =>
                dispatch(
                  setFormData({ ...formData, pages: Number(e.target.value) }),
                )
              }
              value={formData["pages"]}
            />
          </Form.Item>

          <Form.Item
            label="Year Published"
            name="yearPublished"
            rules={[
              {
                required: true,
                validator(_, value) {
                  const yearRegex = /^(1\d{3}|2\d{3}|3000)$/
                  if (yearRegex.test(value)) {
                    setErrorObject({ ...errorObject, yearPublished: true })
                    return Promise.resolve()
                  }
                  setErrorObject({ ...errorObject, yearPublished: false })
                  return Promise.reject()
                },
                message:
                  "Please write the year it was published in a 4-digit format between 1000 and 3000",
              },
            ]}
          >
            <Input
              type="number"
              onChange={(e) =>
                dispatch(
                  setFormData({
                    ...formData,
                    yearPublished: Number(e.target.value),
                  }),
                )
              }
              value={formData["yearPublished"]}
            />
          </Form.Item>

          {/* select genres */}
          <Form.Item
            label="Genres"
            htmlFor="genre"
            name="genre"
            rules={[{ required: true }]}
          >
            <Select
              mode="multiple"
              style={{
                width: "100%",
              }}
              placeholder="Select the genres"
              optionLabelProp="label"
              onChange={(e) => dispatch(setFormData({ ...formData, genre: e }))}
              value={formData["genre"]}
            >
              {genres.map((genre) => (
                <Option
                  value={genre.label}
                  label={genre.label}
                  key={genre.label}
                >
                  <Space>
                    <span role="img" aria-label={genre.label}>
                      {genre.emoji}
                    </span>
                    {genre.label}
                  </Space>
                </Option>
              ))}
            </Select>
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
            loading={isPending}
            htmlType="submit"
            disabled={isError}
            ghost
          />
        </Form.Item>
        <div className="flex flex-col justify-center items-center w-full">
          {isError ? (
            <h4 className="bg-black text-red-500 p-[0.5rem] rounded">
              {error}
            </h4>
          ) : null}
        </div>
      </Form>
    </>
  )
}

export default CreateBook
