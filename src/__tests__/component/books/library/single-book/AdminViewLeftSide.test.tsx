import AdminViewLeftSide from "@/components/books/library/single-book/AdminViewLeftSide"
import { Genre } from "@/types/Genre"
import { render, fireEvent } from "@testing-library/react"
import StoreProvider from "@/store/StoreProvider"
import { NotificationProvider } from "@/context/NotificationProvider"
import QueryProvider from "@/query/QueryProvider"
import "@testing-library/jest-dom"

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false, // Default to desktop/mobile layout state
      media: query,
      onchange: null,
    })),
  })
})

describe("Left side of Admin view of Single book component", () => {
  test("all book edit and delete buttons render for admin user", () => {
    const props = {
      bookData: {
        author: "testAuthor",
        genre: [Genre.ACTION],
        pages: 500,
        title: "test",
        yearPublished: 1900,
        _id: "dfgdfgfd",
      },
      bookId: "dfgdfgfd",
    }
    const { getByRole } = render(
      <QueryProvider>
        <StoreProvider>
          <NotificationProvider>
            <AdminViewLeftSide {...props} />
          </NotificationProvider>
        </StoreProvider>
      </QueryProvider>,
    )
    const deleteBookButton = getByRole("button", { name: /delete book/i })
    const editTitleButton = getByRole("button", { name: /edit title/i })
    const editImageButton = getByRole("button", { name: /change image/i })

    expect(deleteBookButton).toBeDefined()
    expect(editTitleButton).toBeDefined()
    expect(editImageButton).toBeDefined()
  })
  test("book card renders correct information", () => {
    const props = {
      bookData: {
        author: "testAuthor",
        genre: [Genre.ACTION],
        pages: 500,
        title: "test",
        yearPublished: 1900,
        dateOfMeeting: "2026-04-11T22:00:00.000Z",
        actualDateOfMeeting: "2026-04-11T22:00:00.000Z",
        reviewImageURL: "https://res.cloudinary.com",
        totalScore: 9.5,
        _id: "dfgdfgfd",
      },
      bookId: "dfgdfgfd",
    }
    const { getByText, getByRole } = render(
      <QueryProvider>
        <StoreProvider>
          <NotificationProvider>
            <AdminViewLeftSide {...props} />
          </NotificationProvider>
        </StoreProvider>
      </QueryProvider>,
    )

    const cardImg = getByRole("img", { name: /test book cover/i })
    const cardCertImg = getByRole("img", { name: /worm badge certification/i })

    const cardScore = getByText("9.5/10")

    expect(cardImg).toBeDefined()
    expect(cardCertImg).toBeDefined()
    expect(cardImg).toHaveAttribute(
      "src",
      "/_next/image?url=https%3A%2F%2Fres.cloudinary.com&w=1080&q=75",
    )
    expect(cardScore).toBeDefined()
  })
  test("edit title button when click show book edit input", () => {
    const props = {
      bookData: {
        author: "testAuthor",
        genre: [Genre.ACTION],
        pages: 500,
        title: "test",
        yearPublished: 1900,
        _id: "dfgdfgfd",
      },
      bookId: "dfgdfgfd",
    }
    const { getByRole } = render(
      <QueryProvider>
        <StoreProvider>
          <NotificationProvider>
            <AdminViewLeftSide {...props} />
          </NotificationProvider>
        </StoreProvider>
      </QueryProvider>,
    )
    const editTitleButton = getByRole("button", { name: /edit title/i })

    fireEvent.click(editTitleButton)
    expect(getByRole("textbox")).toBeInTheDocument()
    expect(getByRole("textbox")).toHaveValue("test")
  })
})
