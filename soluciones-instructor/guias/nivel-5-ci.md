# Nivel 5 — Integración Continua (Issue #6)

Archivo: `.github/workflows/e2e.yml`. No hay "ejecución local" del workflow: se
prueba haciendo push/PR o con **Run workflow** (`workflow_dispatch`). Lo que sí
puede correr localmente es cada comando que el job invoca.

---

## 1. Job que valide formato

⚠️ **Trampa**: el script `format` es `prettier --write`. Si haces
`npm run format -- --check` el comando final es `prettier --write ... --check`,
que **falla** (write y check son mutuamente excluyentes). Solución limpia: añade
un script dedicado.

```jsonc
// package.json → scripts
"format": "prettier --write \"**/*.{ts,json,md}\"",
"format:check": "prettier --check \"**/*.{ts,json,md}\"",
```

Localmente:

```bash
npm run format:check
```

Job nuevo en `.github/workflows/e2e.yml` (o un step dentro de `calidad`):

```yaml
formato:
  name: Formato (Prettier)
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: 20
        cache: npm
    - run: npm ci
    - name: Verificar formato
      run: npm run format:check
```

> No olvides añadir `formato` a `needs` del job agregador `ci-ok`.

---

## 2. Agregar Firefox a `playwright.config.ts` y a la matriz

En `playwright.config.ts`, un project nuevo por nivel-en-Firefox (ejemplo con
el Nivel 1; replica el patrón para los demás):

```ts
import { defineConfig, devices } from '@playwright/test';
// ...
projects: [
  // ...los existentes (Chromium)...
  {
    name: 'nivel-1-firefox',
    testDir: './tests/nivel-1-basico',
    use: { ...devices['Desktop Firefox'] },
  },
],
```

En el workflow, añadir el valor a la matriz del job `playwright`:

```yaml
strategy:
  fail-fast: false
  matrix:
    nivel: [nivel-1-basico, nivel-2-pom, nivel-3-screenplay, nivel-6-api, nivel-1-firefox]
```

Y que el paso de instalación traiga Firefox:

```yaml
- name: Instalar navegador
  run: npx playwright install --with-deps chromium firefox
```

Probar local:

```bash
npx playwright test --project=nivel-1-firefox
```

---

## 3. Agregar el badge de estado al README

En `README.md` (arriba del todo), reemplaza `OWNER/REPO` por tu fork:

```md
[![E2E](https://github.com/OWNER/REPO/actions/workflows/e2e.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/e2e.yml)
```

Para este repo: `gpalominoh-canvia/canvia-playwright-training`.

---

## 4. Disparar el workflow manualmente y revisar artefactos

El workflow ya tiene `workflow_dispatch`. Desde GitHub:

1. Pestaña **Actions** → workflow **E2E** → botón **Run workflow** → elige rama.
2. Al terminar, en la página del run, sección **Artifacts**: descarga
   `playwright-report-*`, `cucumber-report`, etc.

Con CLI:

```bash
gh workflow run e2e.yml --ref develop
gh run watch                    # seguir el progreso
gh run download                 # bajar artefactos del último run
```

---

## 5. (Reto) Subir capturas si falla el job `cucumber`

Cucumber no genera capturas solo: agrégalas en un hook `After` que detecte el
fallo del escenario y adjunte/guarde el screenshot.

```ts
// src/nivel-4-bdd/support/hooks.ts  (añadir)
import { Status } from '@cucumber/cucumber';
import fs from 'node:fs';

After(async function (this: CustomWorld, { result, pickle }) {
  if (result?.status === Status.FAILED && this.page) {
    fs.mkdirSync('playwright-report/screenshots', { recursive: true });
    const safe = pickle.name.replace(/[^a-z0-9]+/gi, '_');
    const png = await this.page.screenshot({
      path: `playwright-report/screenshots/${safe}.png`,
    });
    this.attach(png, 'image/png'); // también queda embebida en el HTML
  }
  await this.page?.close();
  await this.context?.close();
});
```

En el job `cucumber` del workflow, subir esa carpeta cuando algo falle:

```yaml
- name: Subir capturas de fallo
  if: failure()
  uses: actions/upload-artifact@v4
  with:
    name: cucumber-screenshots
    path: playwright-report/screenshots/
    retention-days: 7
```

> `if: failure()` solo sube capturas cuando el step de ejecución falló; el
> reporte HTML se sigue subiendo con su `if: always()` aparte.

## Notas para explicar

- **`workflow_dispatch`** = botón manual; **`schedule`** = cron; **`push`/`pull_request`**
  = automático. Este workflow tiene los tres.
- **`concurrency` + `cancel-in-progress`** evita runs apilados del mismo branch.
- El job **`ci-ok`** es el _required check_: agrega siempre los jobs nuevos a su
  `needs`, o pasarán "por fuera" de la protección de rama.
- **Artefactos** = evidencia descargable (reportes, trazas, capturas) con
  `retention-days`.

## Errores típicos del alumno

- `npm run format -- --check` (write + check chocan). Crear `format:check`.
- Agregar el project Firefox pero olvidar `firefox` en `playwright install`.
- Añadir un job y no sumarlo a `needs` de `ci-ok`.
- Usar `if: always()` donde corresponde `if: failure()` para las capturas.
