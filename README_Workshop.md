# Workshop UI Testing

## Vorbereitung

1. Falls nötig, installiere Node 18 oder neuer.
1. Falls nötig, installiere yarn: ``npm install -g yarn``
1. Run ``yarn`` um dependencies zu installieren.

## Die Anwendung

* ``npm start`` ausführen, um Frontend und Backend der Cypress Real World App zu starten.  
* Wenn die Anwendung gestartet ist, auf http://localhost:3000/ navigieren.
* Login mit Testuser:
  * Username: ``bblub``
  * Passwort: ``Testing123``
  * Alternativ Sign-Up Prozess durchlaufen (Achtung: Selbst angelegte user werden beim Neustart der Anwendung gelöscht).
* 3 Minuten explorativ durch die Anwendung klicken. Dabei im Netzwerktab beobachten, welche http-calls rausgehen.
* Beispielszenarien:
  * Neuen Bankaccount anlegen
  * Neue Transaktion anlegen (grüner `NEW` Button)
  * Einen Kommentar zu einer Transaktion schreiben

## Test Setup
Auf dem ``develop`` branch ist das grundsätzliche Setup für sowohl Cypress als auch Playwright bereits vorhanden
und du kannst direkt mit dem Testing beginnen.
Wenn du das Setup selbst erstellen möchtest, wechsle bitte auf den branch ``workshop-no-setup``.
// TODO: sebastian.butzek 20.08.24: branch ohne setup erstellen 

## Den ersten UI Test schreiben

**Entscheide dich für ein Framework!**

### Entscheidung für Cypress
Für Cypress verfügt die Anwendung bereits über End-to-End Tests und API-Tests fürs Backend.
Du findest die Tests im package `cypress/tests` unter `e2e` bzw `api`. 
Die E2E-Tests können als Inspiration für UI-Tests-Szenarien dienen.  
Im gleichen Verzeichnis findest du auch ein `ui` package.  
Hier gibt es bereits ein Szenario für den Login, der nach dem Start der Anwendung zwingend durchgeführt werden muss.
Das Szenario kann nun beliebig fortgesetzt werden.

### Entscheidung für Playwright
// TODO:  sebastian.butzek 20.08.24: Playwright setup

### Tipps & Tricks

* Die Anwendung verwendet den tag `data-test` für Test-Ids, z.B. `data-test="nav-top-new-transaction"` für den grünen NEW-Button.
  * Test-Ids sind der sicherste Weg, Elemente im DOM zu identifizieren und sollten daher vorzugsweise genutzt werden.
  * Beide Frameworks unterstützen das select via Test-Id (siehe z.B. login-Szenario)





