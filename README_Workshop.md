# Workshop UI Testing

## Vorbereitung

1. Falls nötig, installiere Node 18 oder neuer.
1. Falls nötig, installiere yarn: `npm install -g yarn`
1. Run `yarn` um dependencies zu installieren.

## Die Anwendung

- `npm start` ausführen, um Frontend und Backend der Cypress Real World App zu starten.
- Wenn die Anwendung gestartet ist, auf http://localhost:3000/ navigieren.
- Login mit Testuser:
  - Username: `bblub`
  - Passwort: `Testing123`
  - Alternativ Sign-Up Prozess durchlaufen (Achtung: Selbst angelegte user werden beim Neustart der Anwendung gelöscht).
    - Validierung für Account Number und Routing Number: Jeweils 9 Zahlen.
- 3 Minuten explorativ durch die Anwendung klicken. Dabei im Netzwerktab beobachten, welche http-calls rausgehen.

### Beispielszenarien
  - Neuen Bankaccount anlegen + prüfen, dass dieser hinterher richtig in der Übersicht erscheint.
  - Neue Transaktion anlegen (grüner `NEW` Button)
  - Einen Kommentar zu einer Transaktion schreiben

## Test Setup

Auf dem `develop` branch ist das grundsätzliche Setup für sowohl Cypress als auch Playwright bereits vorhanden
und du kannst direkt mit dem Testing beginnen.
Wenn du das Setup selbst erstellen möchtest, wechsle bitte auf den branch `workshop-no-setup`.

## Den ersten UI Test schreiben

**Entscheide dich für ein Framework!**

### Entscheidung für Cypress

Die globalen Settings für Cypress findest du in der [cypress.config.ts](./cypress.config.ts).

Für Cypress verfügt die Anwendung bereits über End-to-End Tests und API-Tests fürs Backend.
Du findest die Tests im package `cypress/tests` unter `e2e` bzw `api`.
Die E2E-Tests können als Inspiration für UI-Tests-Szenarien dienen.  
Im gleichen Verzeichnis findest du auch ein `ui` package.  
Hier gibt es bereits ein Szenario für den Login, der nach dem Start der Anwendung zwingend durchgeführt werden muss.
Das Szenario kann nun beliebig fortgesetzt werden. Zur Inspiration siehe oben beschriebene [Beispielszenarien](#Beispielszenarien).

Starten der Tests:
* Frontend starten: `yarn run start:react`. Um sicherzugehen, dass nicht das echte Backend verwendet wird den evtl. vorher gestarteten Prozess beenden.
* Cypress starten: `yarn run cypress:open`. 
* In der sich öffnenden Anwendung `E2E Testing` wählen. Danach gewünschten Browser auswählen.
* Im Browser wird die package-Struktur der existierenden Tests abgebildet. Unter ``specs`` ganz nach unten scrollen zum package `ui`.
* ``login.spec.ts`` auswählen.

Wichtig: Vor dem Start des Tests muss das Frontend gestartet sein! (`yarn run start:react`).  
Um sicher zu sein, dass nicht das echte Backend verwendet wird nur das Frontend starten, nicht die gesamte Anwendung!

### Entscheidung für Playwright

Die globalen Settings für Playwright findest du in der [playwright.config.ts](./playwright.config.ts).

Einen ersten UI-Test für den login findest du unter `playwright/tests/ui`.  
Führe das Testszenario beliebig fort! Zur Inspiration siehe oben beschriebene [Beispielszenarien](#Beispielszenarien).

Als Startpunkt kannst du den Playwright Codegenerator verwenden: `yarn run playwright:codegen`.  

Falls die Tests beim ersten Versuch nicht starten muss `yarn playwright install` ausgeführt werden.

### Tipps & Tricks

- Die Anwendung verwendet den tag `data-test` für Test-Ids, z.B. `data-test="nav-top-new-transaction"` für den grünen NEW-Button.
  - Test-Ids sind ein sicherer Weg, Elemente im DOM zu identifizieren (z.B. bei dynamischen Texten).
  - Beide Frameworks unterstützen das select via Test-Id (siehe z.B. login-Szenario).
  - Good Practice ist allerdings, user-zentriert zu selektieren, z.B. via role + name oder label. Siehe auch https://playwright.dev/docs/locators#locating-elements
- Testgenerierung:
  - Playwright Codegen: `yarn playwright codegen localhost:3000`
  - Cypress: [Browser Plugin für Chrome (Cypress Chrome Recorder)](https://chromewebstore.google.com/detail/cypress-chrome-recorder/fellcphjglholofndfmmjmheedhomgin)
- Tests im UI-Mode starten:
  - Playwright: `yarn playwright test --ui`
  - Cypress: `yarn cypress open`
  - Ermöglicht es, den Verlauf eines Tests visuell und mit Console, Network Tab, etc. nachzuverfolgen.
- Einzelnen Test übers Terminal starten:
  - Playwright: Identifier oder filename des gewünschten Tests ans command anhängen, bspw. `yarn run playwright test login`
  - Cypress: `yarn cypress run --spec cypress/tests/ui/login.spec.ts`
