import BookLibrary from "@/components/books/library/BookLibrary"
import { useGetQuery } from "@/hooks/fetch-hooks/useGetQuery"
import { Genre } from "@/types/Genre"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"

jest.mock("@/hooks/fetch-hooks/useGetQuery")

const mockUseGetQuery = jest.mocked(useGetQuery)

describe("tests the book library page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("renders book data successfully", () => {
    const mockBookData = [
      {
        author: "testAuthor",
        genre: [Genre.ACTION],
        pages: 500,
        title: "test",
        yearPublished: 1900,
        _id: "dfgdfgfd",
        read: true,
      },
      {
        author: "testAuthor2",
        genre: [Genre.ACTION],
        pages: 500,
        title: "test2",
        yearPublished: 1900,
        _id: "dfgdfgfd222",
        read: true,
      },
    ]

    mockUseGetQuery.mockReturnValue({
      data: mockBookData,
      isLoading: false,
      isError: false,
      error: null,
    })

    const { getByRole } = render(<BookLibrary />)

    expect(getByRole("heading", { name: /^test$/i })).toBeInTheDocument()
    expect(getByRole("heading", { name: /^test2$/i })).toBeInTheDocument()
  })
})
