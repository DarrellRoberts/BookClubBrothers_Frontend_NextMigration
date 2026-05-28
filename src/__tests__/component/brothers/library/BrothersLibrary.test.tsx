import BrotherLibrary from "@/components/brothers/library/BrothersLibrary"
import { useGetQuery } from "@/hooks/fetch-hooks/useGetQuery"
import { Genre } from "@/types/Genre"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import QueryProvider from "@/query/QueryProvider"
import StoreProvider from "@/store/StoreProvider"
import { NotificationProvider } from "@/context/NotificationProvider"

jest.mock("@/hooks/fetch-hooks/useGetQuery")

const mockGetQuery = jest.mocked(useGetQuery)

describe("mocks the brother library component", () => {
  beforeEach(() => jest.clearAllMocks())

  test("component loads brothers data", () => {
    const mockBrotherData = [
      {
        userInfo: {
          books: {
            booksCommented: [""],
            booksScored: [""],
            comments: [""],
            score: [0],
          },
          favGenre: [Genre.ACTION],
          profileURL: "",
          residence: {
            country: "",
            city: "",
          },
        },
        username: "test",
        _id: "testid",
        lastLoggedIn: "",
      },
      {
        userInfo: {
          books: {
            booksCommented: [""],
            booksScored: [""],
            comments: [""],
            score: [0],
          },
          favGenre: [Genre.ACTION],
          profileURL: "",
          residence: {
            country: "",
            city: "",
          },
        },
        username: "test2",
        _id: "testid2",
        lastLoggedIn: "",
      },
    ]

    mockGetQuery.mockReturnValue({
      data: mockBrotherData,
      isLoading: false,
      isError: false,
      error: null,
    })

    const { getByRole } = render(
      <QueryProvider>
        <StoreProvider>
          <NotificationProvider>
            <BrotherLibrary />
          </NotificationProvider>
        </StoreProvider>
      </QueryProvider>,
    )

    expect(getByRole("heading", { name: /^test$/i })).toBeInTheDocument()
    expect(getByRole("heading", { name: /^test2$/i })).toBeInTheDocument()
  })
})
