import { expect, test } from "@playwright/test";

test("loads the Coca-Cola organizational chart workspace", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Coca-Cola" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Organizational Chart" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("button", { name: /Robert Elbert/i })).toBeVisible();
});

