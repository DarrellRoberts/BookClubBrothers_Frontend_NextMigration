import { test, expect } from "@playwright/test"

test("book circle link mounts on homepage", async ({ page }) => {
  await page.goto("https://bookclub-brothers.vercel.app/")

  const bookCircleLink = page.getByTestId("book-egg-link")

  expect(bookCircleLink).toBeVisible()

  await expect(bookCircleLink).toHaveAttribute("href", "/books")
})

test("club circle link mounts on homepage", async ({ page }) => {
  await page.goto("https://bookclub-brothers.vercel.app/")

  const clubCircleLink = page.getByTestId("club-egg-link")

  expect(clubCircleLink).toBeVisible()

  await expect(clubCircleLink).toHaveAttribute("href", "/club")
})

test("brother circle link mounts on homepage", async ({ page }) => {
  await page.goto("https://bookclub-brothers.vercel.app/")

  const brotherCircleLink = page.getByTestId("brothers-egg-link")

  expect(brotherCircleLink).toBeVisible()

  await expect(brotherCircleLink).toHaveAttribute("href", "/brothers")
})
