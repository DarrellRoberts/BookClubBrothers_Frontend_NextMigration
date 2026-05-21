import { Genre } from "@/types/Genre"
import test, { expect } from "@playwright/test"

test.describe("Happy path to create book selection", async () => {
  const username = "Test"
  const password = "testTEST.123"
  let bookId
  let token

  test.afterAll("delete book", async ({ request }) => {
    const unreadBooksReq = await request.get(
      "http://localhost:8080/books/unread/all",
    )
    const unreadBooks = await unreadBooksReq.json()
    bookId = unreadBooks?.find((book) => book.title === "e Test Title")?._id
    if (bookId && token) {
      await request.delete(`http://localhost:8080/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
    }
  })

  test.beforeEach(async ({ request }) => {
    const authResponse = await request.post(
      "http://localhost:8080/users/login",
      {
        data: { username, password },
      },
    )

    const authData = await authResponse.json()
    token = authData.token
  })

  test("successfully create a book", async ({ page, context }) => {
    await context.addCookies([
      {
        name: "token",
        value: token,
        domain: "localhost",
        path: "/",
      },
    ])
    await page.goto("http://localhost:3000/")
    await test.step("Navigate to book randomiser page", async () => {
      await page.goto("http://localhost:3000/books/randomiser")
    })
    await test.step("open book from", async () => {
      await page.getByRole("button", { name: /add book/i }).click()
    })
    await test.step("fill out book form", async () => {
      await page.getByTestId("unread-book-title-input").fill("e Test Title")
      await page.getByTestId("unread-book-author-input").fill("e Test Author")
      await page.getByTestId("unread-book-pages-input").fill("500")
      await page.getByTestId("unread-book-yearPublished-input").fill("1992")
      await page.getByTestId("unread-book-genre-input").click()
      await page.getByText(Genre.ACTION).click()
      await page.keyboard.press("Escape")
    })
    await test.step("successfully submit book", async () => {
      await page.getByRole("button", { name: /submit/i }).click()

      await expect(
        page.getByRole("alert").filter({ hasText: /book successfully added/i }),
      ).toBeVisible()
    })
  })
})
