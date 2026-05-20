import { test, expect } from "@playwright/test"

test.describe("login flow", async () => {
  const username = "Test"
  const password = "testTEST.123"
  test("successful login into dev FE using dev BE", async ({ page }) => {
    await page.goto("http://localhost:3000/")

    await test.step("open login modal", async () => {
      await page.getByRole("button", { name: /login/i }).click()
    })

    await test.step("enter credentials", async () => {
      await page.getByTestId("username-input").fill(username)
      await page.getByTestId("password-input").fill(password)
      await page.getByRole("button", { name: /submit/i }).click()
    })

    await test.step("expect redirect after successful login", async () => {
      await expect(page.getByRole("heading", { name: "Test" })).toBeVisible({
        timeout: 5000,
      })
    })
  })
  test("unsuccessful login with wrong username", async ({ page }) => {
    await page.goto("http://localhost:3000/")

    await test.step("open login modal", async () => {
      await page.getByRole("button", { name: /login/i }).click()
    })

    await test.step("enter credentials", async () => {
      await page.getByTestId("username-input").fill("wrong username")
      await page.getByTestId("password-input").fill(password)
      await page.getByRole("button", { name: /submit/i }).click()
    })

    await test.step("get wrong username error message", async () => {
      await expect(
        page.getByText(
          /your username appears to be incorrect. have a think and try again will ya?/i,
        ),
      ).toBeVisible()
      await expect(
        page.getByRole("heading", { name: "Test" }),
      ).not.toBeVisible()
    })
  })
  test("unsuccessful login with wrong password", async ({ page }) => {
    await page.goto("http://localhost:3000/")

    await test.step("open login modal", async () => {
      await page.getByRole("button", { name: /login/i }).click()
    })

    await test.step("enter credentials", async () => {
      await page.getByTestId("username-input").fill(username)
      await page.getByTestId("password-input").fill("wrong password")
      await page.getByRole("button", { name: /submit/i }).click()
    })

    await test.step("get wrong password error", async () => {
      await expect(
        page.getByText(/hmmm incorrect password. let's hope you made a typo./i),
      ).toBeVisible()
    })
  })
})
