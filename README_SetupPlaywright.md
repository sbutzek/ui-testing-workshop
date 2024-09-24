# Setup mit Playwright

Doku: https://playwright.dev/docs/intro

## Setup zum lokalen Testen

- `yarn create playwright` ausführen.
  - Prompts beantworten. Als Test-Package z.B. `Playwright` wählen.
- Was passiert?
  - Dependencies in package.json hinzugefügt + installiert
  - playwright.config.ts angelegt
  - example.spec.ts angelegt
    - Die Tests sollten sich z.B. über IntelliJ (Ultimate) im headless mode direkt ausführen lassen
- Nützliche Commands (idealerweise in package.json#scripts) ergänzen:
  - Run tests headless: `yarn playwright test`
  - Headed: `yarn playwright test --headed`
  - UI Mode: `yarn playwright test --ui`
  - Codegen: `yarn playwright codegen localhost:3000`
- playwright.config prüfen:
  - baseUrl anpassen, falls diese in Tests verwendet werden soll
  - Nicht gewünschte Browser (unter `projects`) löschen (sonst wird jeder Test in 3 Browsern ausgeführt)
  - Falls gewünscht webserver definieren (siehe #Zusätzliches Setup für CI Pipeline)

## Zusätzliches Setup für CI Pipeline

- Start des Webservers definieren:

  - In playwright.config.ts `webServer` Objekt einkommentieren und anpassen (config für UI Testing!):

  ```typescript
      webServer: {
        command: "npm run start react",
        url: "http:localhost:3000",
        reuseExistingServer: true,
      },

  ```

- Damit wird vor jedem Testrun geprüft, ob das Frontend gestartet ist und bei Bedarf der Startbefehl ausgeführt.
