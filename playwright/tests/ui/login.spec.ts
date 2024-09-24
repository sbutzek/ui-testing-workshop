import { expect, test } from "@playwright/test";
import { HttpMocks } from "./HttpMocks";

test("login", async ({ page }) => {
  await page.route("*/**/login", async (route) => {
    await route.fulfill({ json: {}, status: 200 });
  });

  await page.route("*/**/notifications", async (route) => {
    await route.fulfill({ json: { results: [] }, status: 200 });
  });

  await page.route("*/**/transactions/public", async (route) => {
    await route.fulfill({ json: { results: [] }, status: 200 });
  });

  const emptyBankAccountResponseBody = {
    data: {
      listBankAccount: null,
    },
  };
  const httpMocks = new HttpMocks(page);
  await httpMocks.mockGraphqlRequests(emptyBankAccountResponseBody);

  // Login
  await page.goto("http://localhost:3000/");
  await page.getByTestId("signin-username").getByLabel("Username").fill("bblub");
  await page.getByTestId("signin-password").getByLabel("Password").fill("Testing123");
  await page.getByTestId("signin-remember-me").check();
  await page.getByTestId("signin-submit").click();

  // Onboarding
  await expect(page.getByTestId("user-onboarding-dialog")).toBeVisible();
  await page.getByTestId("user-onboarding-next").click();
  await expect(page.getByTestId("nav-top-notifications-count")).toBeVisible();
  await expect(page.getByTestId("user-onboarding-dialog-title")).toHaveText("Create Bank Account");
  await page
    .getByTestId("bankaccount-bankName-input")
    .getByPlaceholder("Bank Name")
    .fill("The Best Bank");
  await page
    .getByTestId("bankaccount-accountNumber-input")
    .getByPlaceholder("Account Number")
    .fill("123456789");
  await page
    .getByTestId("bankaccount-routingNumber-input")
    .getByPlaceholder("Routing Number")
    .fill("987654321");

  await page.getByTestId("bankaccount-submit").click();
  await expect(page.getByTestId("user-onboarding-dialog-title")).toHaveText("Finished");

  await page.getByTestId("user-onboarding-next").click();
  await page.getByTestId("sidenav-bankaccounts").click();
});
