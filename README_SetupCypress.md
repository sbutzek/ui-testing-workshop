# Setup mit Cypress

Doku: https://docs.cypress.io/guides/getting-started/installing-cypress

## Setup zum lokalen Testen

- Run ``yarn add cypress --dev``
- Cypress App öffnen: ``yarn cypress open``
- Wenn die App geöffnet ist, `E2E Testing` auswählen.
- Cypress wird einige config files anlegen, mit `OK` bestätigen.
- Browser auswählen → Browser öffnet sich.
- Mit ``create new spec`` ein erster Test angelegt werden.
- Es macht Sinn, das Standard-spec-pattern zu überschreiben. Dazu in der angelegten ``cypress.config.ts`` im `e2e`-Block setzen:
- ``specPattern: "cypress/**/*.spec.{js,jsx,ts,tsx}"``
- Für unsere Anwendung kann zusätzlich die baseUrl gesetzt werden: `baseUrl: "http://localhost:3000"`

## Einen ersten Test erstellen

- Falls noch nicht geschehen, erste .spec file anlegen, z.B.: ```cypress/ui/login.spec.ts```
- In der geöffneten Cypress App sollten nun die angelegten Testfiles unter ``Specs`` sichtbar und ausführbar sein (im Browser unter http://localhost:3000/__/#/specs)
- Tests können in jest-Syntax geschrieben werden, z.B.:
    ```typescript
    describe("login", () => {
      it("should visit login", () => {
        cy.visit("/");
      });
    });
    ```
- Natürlich kann Cypress auch über die command line gesteuert werden: https://docs.cypress.io/guides/guides/command-line
- Alles Weitere findest du in der [Workshop Readme](./README_Workshop.md). Happy Testing!

