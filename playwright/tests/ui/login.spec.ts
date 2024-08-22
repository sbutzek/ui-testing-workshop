import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  // await page.goto("http://localhost:3000/signin");
  await page.getByLabel("Username").click();
  await page.getByLabel("Username").fill("bblub");
  await page.getByLabel("Username").press("Tab");
  await page.getByLabel("Password").fill("Testing123");
  await page.getByLabel("Remember me").check();
  await page.locator('[data-test="signin-submit"]').click();
});
