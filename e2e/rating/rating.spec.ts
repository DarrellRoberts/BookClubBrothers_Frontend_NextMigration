import { Genre } from "@/types/Genre"
import { test, expect } from "@playwright/test"

test.describe("Happy path to rating a book", () => {
  const username = "Test"
  const password = "testTEST.123"
  let bookId
  let token

  test.afterAll("Delete created book", async ({ request }) => {
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

    const bookResponse = await request.post("http://localhost:8080/books", {
      data: {
        title: `testTitle${Math.random() * 100}`,
        author: "testAuthor",
        pages: 500,
        yearPublished: 1992,
        genre: [Genre.ACTION],
        read: true,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const bookData = await bookResponse.json()
    bookId = bookData._id
  })

  test("submit a 10 rating", async ({ page, context }) => {
    await context.addCookies([
      {
        name: "token",
        value: token,
        domain: "localhost",
        path: "/",
      },
    ])
    await page.goto("http://localhost:3000/")
    await test.step("navigate to book page", async () => {
      await page.goto(`http://localhost:3000/books/library/${bookId}`)
    })

    await test.step("open rating modal", async () => {
      await page
        .getByRole("button", { name: "Submit rating", exact: true })
        .click()
    })

    await test.step("enter and submit rating", async () => {
      await page.getByTestId("book-rating-input").fill("10")
      await page.getByRole("button", { name: "Submit", exact: true }).click()
      await expect(
        page
          .getByRole("alert")
          .filter({ hasText: /Rating successfully submitted/i }),
      ).toBeVisible()
    })
  })
})
