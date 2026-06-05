# Nivel 1 — Fundamentos de Playwright

> Tests "planos": sin patrones, foco 100% en aprender las APIs de Playwright.

## Objetivos

- Entender la anatomía de un test (`test`, `expect`, `async/await`).
- Navegar y localizar elementos.
- Realizar interacciones y aserciones web-first.
- Ejecutar, depurar y leer reportes.

## Contenido

### Clase 1 — Primer test y herramientas

1. **Instalación**
   ```bash
   npm install
   npx playwright install
   ```
2. **Configuración:** repaso de `playwright.config.ts` (baseURL, projects).
3. **Anatomía de un test:**
   ```ts
   import { test, expect } from '@playwright/test';

   test('descripción', async ({ page }) => {
     await page.goto('/');
     await expect(page).toHaveTitle('Swag Labs');
   });
   ```
4. **Ejecutar:**
   ```bash
   npm run test:nivel-1
   npm run report
   ```

📄 Archivo: `tests/nivel-1-basico/01-primer-test.spec.ts`

### Clase 2 — Localizadores, interacciones y aserciones

- **Localizadores recomendados:** `getByRole`, `getByLabel`, atributos
  `data-test`. Evitar selectores frágiles basados en estilos.
- **Interacciones:** `fill`, `click`, `check`, `selectOption`.
- **Aserciones web-first:** `toBeVisible`, `toHaveText`, `toHaveURL`,
  `toHaveCount` (esperan automáticamente).
- **Hooks y agrupación:** `test.beforeEach`, `test.describe`.
- **Depuración:**
  ```bash
  npm run test:debug    # inspector paso a paso
  npm run test:ui       # modo UI
  npm run codegen       # grabar acciones
  ```

📄 Archivo: `tests/nivel-1-basico/02-interacciones.spec.ts`

## Ejercicio del nivel

En una rama `feature/<tu-nombre>-nivel1`:

1. Agrega un test que verifique que, tras un login exitoso, el botón
   del menú (hamburguesa) está visible.
2. Agrega un test que valide el mensaje de error del **usuario bloqueado**
   (`locked_out_user`).
3. Abre un PR a `develop` siguiendo [git-workflow.md](git-workflow.md).

## Errores comunes

- Olvidar `await` en acciones/aserciones.
- Usar selectores frágiles (clases de CSS volátiles).
- No esperar (las aserciones web-first ya esperan: no uses `waitForTimeout`).

---

<sub>📚 <a href="README.md">Índice de documentación</a> · <a href="../README.md">Inicio del repositorio</a></sub>
