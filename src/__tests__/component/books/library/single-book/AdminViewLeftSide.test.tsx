import AdminViewLeftSide from "@/components/books/library/single-book/AdminViewLeftSide"
import { Genre } from "@/types/Genre"
import { render } from "@testing-library/react"
import StoreProvider from "@/store/StoreProvider"
import { NotificationProvider } from "@/context/NotificationProvider"
import QueryProvider from "@/query/QueryProvider"

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
})
