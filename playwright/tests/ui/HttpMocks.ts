import { Page } from "@playwright/test";

export class HttpMocks {
  constructor(private readonly page: Page) {}

  async mockGraphqlRequests(listBankAccountResponseBody: any) {
    await this.page.route("*/**/graphql", async (route) => {
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
  }

  async mockCommonCalls() {
    await this.page.route("*/**/login", async (route) => {
      await route.fulfill({ json: {}, status: 200 });
    });

    await this.page.route("*/**/notifications", async (route) => {
      await route.fulfill({ json: { results: [] }, status: 200 });
    });

    await this.page.route("*/**/transactions/public", async (route) => {
      await route.fulfill({ json: { results: [] }, status: 200 });
    });
  }
}
