const apiGraphQL = `${Cypress.env("apiUrl")}/graphql`;

describe("Bank Accounts", function () {
  beforeEach(() => {
    // cy.task("db:seed");

    cy.intercept("POST", "/login", {
      status: 200,
    }).as("login");

    cy.intercept("GET", "/notifications", {
      statusCode: 200,
      body: {
        results: [],
      },
    }).as("getNotifications");

    cy.intercept("POST", apiGraphQL, (req) => {
      const { body } = req;

      if (body.hasOwnProperty("operationName") && body.operationName === "ListBankAccount") {
        req.alias = "gqlListBankAccountQuery";
      }

      if (body.hasOwnProperty("operationName") && body.operationName === "CreateBankAccount") {
        req.alias = "gqlCreateBankAccountMutation";
      }

      if (body.hasOwnProperty("operationName") && body.operationName === "DeleteBankAccount") {
        req.alias = "gqlDeleteBankAccountMutation";
      }
    });
  });

  it("should perform login and create a new bankaccount", () => {
    cy.visit("/");

    cy.getBySel("signin-username").type("bblub");
    cy.getBySel("signin-password").type("Testing123");
    cy.getBySel("signin-remember-me").click();
    cy.getBySel("signin-submit").click();
    cy.wait("@login");

    cy.wait("@getNotifications");

    // Onboarding
    cy.getBySel("user-onboarding-dialog").should("be.visible");
    cy.getBySel("list-skeleton").should("not.exist");
    cy.getBySel("nav-top-notifications-count").should("exist");
    cy.visualSnapshot("User Onboarding Dialog");
    cy.getBySel("user-onboarding-next").click();

    cy.getBySel("user-onboarding-dialog-title").should("contain", "Create Bank Account");

    cy.getBySelLike("bankName-input").type("The Best Bank");
    cy.getBySelLike("accountNumber-input").type("123456789");
    cy.getBySelLike("routingNumber-input").type("987654321");
    cy.visualSnapshot("About to complete User Onboarding");
    cy.getBySelLike("submit").click();

    cy.wait("@gqlCreateBankAccountMutation");
  });
});
