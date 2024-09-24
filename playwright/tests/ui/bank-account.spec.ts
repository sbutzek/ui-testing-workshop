import { test, expect } from "@playwright/test";
import { HttpMocks } from "./HttpMocks";

test("bank-account", async ({ page }) => {
  const httpMocks = new HttpMocks(page);
  await httpMocks.mockCommonCalls();

  const bankAccountId = "MEKwhXNLi";
  const bankName = "Quokka Bank";
  await updateBankAccountRequestMock(httpMocks, bankAccountId, bankName);

  // Login
  await page.goto("http://localhost:3000/");
  await page.getByTestId("signin-username").getByLabel("Username").fill("bblub");
  await page.getByTestId("signin-password").getByLabel("Password").fill("Testing123");
  await page.getByTestId("signin-remember-me").check();
  await page.getByTestId("signin-submit").click();

  // Assert Bankaccount
  await page.getByTestId("sidenav-bankaccounts").click();
  await expect(page.getByTestId("bankaccount-list-item-" + bankAccountId)).toHaveText(bankName);
});

const updateBankAccountRequestMock = async (
  httpMocks: HttpMocks,
  bankAccountId: string,
  bankName: string
) => {
  const updatedBankAccountResponseBody = {
    data: {
      listBankAccount: [
        {
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
      ],
    },
  };
  await httpMocks.mockGraphqlRequests(updatedBankAccountResponseBody);
};
