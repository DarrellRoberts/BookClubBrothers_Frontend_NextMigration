import { Genre } from "@/types/Genre"
import { render } from "@testing-library/react"
import StoreProvider from "@/store/StoreProvider"
import { NotificationProvider } from "@/context/NotificationProvider"
import QueryProvider from "@/query/QueryProvider"
import AdminViewRightSide from "@/components/books/library/single-book/AdminViewRightSide"

describe("Right side of Admin view of Single book component", () => {
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
            <AdminViewRightSide {...props} />
          </NotificationProvider>
        </StoreProvider>
      </QueryProvider>,
    )

    const editBookButton = getByRole("button", { name: /edit author/i })
    const editBookYear = getByRole("button", { name: /edit year/i })
    const editBookPages = getByRole("button", { name: /edit genre/i })
    const editBookGenre = getByRole("button", { name: /edit genre/i })
    const editBookDate = getByRole("button", { name: /edit date/i })
    const editActualBookDate = getByRole("button", {
      name: /edit actual date/i,
    })

    expect(editBookButton).toBeDefined()
    expect(editBookYear).toBeDefined()
    expect(editBookPages).toBeDefined()
    expect(editBookGenre).toBeDefined()
    expect(editBookDate).toBeDefined()
    expect(editActualBookDate).toBeDefined()
  })
})
