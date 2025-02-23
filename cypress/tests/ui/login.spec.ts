const apiGraphQL = `${Cypress.env("apiUrl")}/graphql`;

describe("login", function () {
  beforeEach(() => {
    cy.intercept("POST", "/login", {
      status: 200,
    }).as("login");

    cy.intercept("GET", "/notifications", {
      statusCode: 200,
      body: {
        results: [],
      },
    }).as("getNotifications");

    cy.intercept("GET", "/transactions/public", {
      statusCode: 200,
      body: {
        results: [],
      },
    });

    cy.intercept("POST", apiGraphQL, (req) => {
      const { body } = req;

      if (body.hasOwnProperty("operationName") && body.operationName === "ListBankAccount") {
        req.alias = "gqlListBankAccountQuery";
        req.reply(200, {
          data: {
            listBankAccount: null,
          },
        });
      }

      if (body.hasOwnProperty("operationName") && body.operationName === "CreateBankAccount") {
        req.alias = "gqlCreateBankAccountMutation";
        req.reply(200);
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

    cy.getBySel("user-onboarding-dialog-title").should("contain", "Finished");
    cy.getBySel("user-onboarding-dialog-content").should("contain", "You're all set!");
    cy.visualSnapshot("Finished User Onboarding");
    cy.getBySel("user-onboarding-next").click();

    cy.getBySel("sidenav-bankaccounts").should("contain", "Bank Accounts");
  });
});
