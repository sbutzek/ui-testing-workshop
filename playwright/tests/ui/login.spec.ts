import { expect, Page, test } from "@playwright/test";

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
  await mockGraphqlRequests(page, emptyBankAccountResponseBody);

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

  const bankAccountId = "MEKwhXNLi";
  const bankName = "Quokka Bank";
  await updateBankAccountRequestMock(page, bankAccountId, bankName);

  await page.getByTestId("bankaccount-submit").click();
  await expect(page.getByTestId("user-onboarding-dialog-title")).toHaveText("Finished");

  await page.getByTestId("user-onboarding-next").click();
  await page.getByTestId("sidenav-bankaccounts").click();
  await expect(page.getByTestId("bankaccount-list-item-" + bankAccountId)).toHaveText(bankName);
});

const mockGraphqlRequests = async (page: Page, listBankAccountResponseBody: any) => {
  await page.route("*/**/graphql", async (route) => {
    const requestBody = route.request().postData();
    if (!!requestBody && requestBody.indexOf("ListBankAccount") >= 0) {
      await route.fulfill({
        json: listBankAccountResponseBody,
        status: 200,
      });
    }

    if (!!requestBody && requestBody.indexOf("CreateBankAccount") >= 0) {
      await route.fulfill({
        status: 200,
      });
    }
  });
};

const updateBankAccountRequestMock = async (
  page: Page,
  bankAccountId: string,
  bankName: string
) => {
  const updatedBankAccountResponseBody = {
    data: {
      listBankAccount: {
        id: bankAccountId,
        uuid: "3962360b-8f35-4aed-8b18-86b569f3164f",
        userId: "vAPijyVwf",
        bankName: bankName,
        accountNumber: "987645132",
        routingNumber: "123456789",
        isDeleted: false,
        createdAt: "2024-08-15T12:13:09.505Z",
        modifiedAt: "2024-08-15T12:13:09.505Z",
      },
    },
  };
  await mockGraphqlRequests(page, updatedBankAccountResponseBody);
};
