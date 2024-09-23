import { test, expect } from "@playwright/test";

// @ts-ignore
test("login", async ({ page }) => {
  // @ts-ignore
  await page.route("*/**/login", async (route) => {
    await route.fulfill({ json: {}, status: 200 });
  });

  await page.route("*/**/notifications", async (route) => {
    await route.fulfill({ json: { results: [] }, status: 200 });
  });

  await page.route("*/**/graphql", async (route) => {
    const requestBody = route.request().postData();
    if (!!requestBody && requestBody.indexOf("ListBankAccount") >= 0) {
      const responseBody = {
        data: {
          listBankAccount: null,
        },
      };
      await route.fulfill({
        json: responseBody,
        status: 200,
      });
    }
  });

  await page.goto("http://localhost:3000/");
  await page.getByTestId("signin-username").getByLabel("Username").fill("bblub");
  await page.getByTestId("signin-password").getByLabel("Password").fill("Testing123");
  await page.getByTestId("signin-remember-me").check();
  await page.getByTestId("signin-submit").click();

  // Onboarding
  await expect(page.getByTestId("user-onboarding-dialog")).toBeVisible();
  await page.getByTestId("user-onboarding-next").click();

  // cy.getBySel("nav-top-notifications-count").should("exist");
  // cy.visualSnapshot("User Onboarding Dialog");
  // cy.getBySel("user-onboarding-next").click();
  //
});
