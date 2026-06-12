# Soluciones del instructor — Canvia Playwright Training

Material **privado del instructor** para explicar y demostrar la solución de cada
ejercicio de los issues del curso. Dos piezas:

- **[`proyecto-resuelto/`](proyecto-resuelto/)** — copia ejecutable del repo
  `canvia-playwright-training` con **todos los ejercicios resueltos**. Sirve para
  correr y mostrar cada solución en vivo.
- **[`guias/`](guias/)** — un `.md` por nivel que explica ejercicio por ejercicio
  (código + por qué + comando + errores típicos del alumno).

> ⚠️ No subir esta carpeta al repo de los alumnos. Es la "hoja de respuestas".

---

## Cómo ejecutar el proyecto resuelto

El `node_modules` está enlazado (junction) al del repo original. Si lo mueves a
otra máquina o falla, instala dependencias:

```bash
cd proyecto-resuelto
npm install
npx playwright install        # navegadores (chromium + firefox)
```

Comandos por nivel:

```bash
npm run test:nivel-1                       # Nivel 1 (issue #2)
npm run test:nivel-2                       # Nivel 2 (issue #3)
npm run test:nivel-3                       # Nivel 3 + reto #27 (issues #4, #27)
npm run test:nivel-4                       # Nivel 4 BDD (issue #5)
npm run test:nivel-4 -- --tags @carrito    # solo el feature de carrito
npm run test:nivel-4.1                     # Nivel 4.1 (issue #35)
npm run test:nivel-6                       # Nivel 6 API (issue #7)

# Nivel 5 (CI, issue #6) — se valida con los comandos que corre el pipeline:
npm run format:check
npx playwright test --project=nivel-1-firefox
```

Demostraciones útiles en clase:

```bash
npm run test:headed                        # ver el navegador
npm run test:ui                            # modo UI interactivo
npx playwright test --project=nivel-3-screenplay -g "logout"
npm run report                             # abrir el último reporte HTML
```

Estado verificado: **45 ejecuciones en verde** (21 UI + 9 API + 9 BDD N4 +
6 BDD N4.1) + typecheck + lint + format.

---

## Mapa ejercicio → archivo (para explicar uno a uno)

### Issue #2 — Nivel 1 · `tests/nivel-1-basico/03-ejercicios.spec.ts`

Menú visible · usuario bloqueado · logout · orden por precio · (reto) badge.

### Issue #3 — Nivel 2 (POM)

- Ej.1 `src/nivel-2-pom/pages/CartPage.ts`
- Ej.2 `src/nivel-2-pom/pages/InventoryPage.ts` (`addProductByName`, `getCartBadgeCount`) + `tests/nivel-2-pom/cart.spec.ts`
- Ej.3 `src/nivel-2-pom/fixtures/pages.fixture.ts` (`cartPage`)
- Ej.4 `src/nivel-2-pom/data/products.ts`
- Ej.5 (reto) `tests/nivel-2-pom/cart.spec.ts`

### Issue #4 — Nivel 3 (Screenplay)

- Ej.1 `src/nivel-3-screenplay/questions/CurrentUrl.ts`
- Ej.2 `src/nivel-3-screenplay/interactions/Select.ts`
- Ej.3 `src/nivel-3-screenplay/tasks/AddProductToCart.ts` (+ `questions/CartBadgeCount.ts`)
- Ej.4 `tests/nivel-3-screenplay/inventario.spec.ts`
- Ej.5 (reto) `tasks/Logout.ts`, `questions/IsOnLoginPage.ts`, `tests/.../logout.spec.ts`
- Targets: `src/nivel-3-screenplay/ui/InventoryPage.ts` y `ui/LoginPage.ts`

### Issue #27 — Reto Nivel 3 · `tests/nivel-3-screenplay/orden-carrito.spec.ts`

- `questions/ProductPrices.ts` · `tasks/RemoveProductFromCart.ts`

### Issue #5 — Nivel 4 (BDD)

- Ej.1 `tests/nivel-4-bdd/login.feature` + steps en `src/nivel-4-bdd/steps/login.steps.ts`
- Ej.2 `tests/nivel-4-bdd/carrito.feature` + `src/nivel-4-bdd/steps/carrito.steps.ts`
- Ej.3 Scenario Outline en `login.feature`
- Ej.4 `npm run test:nivel-4 -- --tags @carrito`
- Ej.5 (reto) reutilización del step de login

### Issue #35 — Nivel 4.1 (BDD + Screenplay)

- Ej.1 `src/nivel-4.1-bdd-screenplay/steps/login.steps.ts` (delega en el Actor)
- Ej.2 `tests/.../carrito.feature` + `steps/carrito.steps.ts`
- Ej.3 `steps/logout.steps.ts` (reusa `Logout` del Nivel 3)
- Ej.4 step "la URL debería contener" (Question `CurrentUrl`)
- Ej.5 (reto) las Tasks/Questions se importan de `@screenplay` (sin duplicar)

### Issue #6 — Nivel 5 (CI) · `.github/workflows/e2e.yml`

- Ej.1 job/step `Formato` + script `format:check` en `package.json`
- Ej.2 project `nivel-1-firefox` en `playwright.config.ts` + matriz e `install`
- Ej.3 badge en `README.md`
- Ej.4 `workflow_dispatch` (ya presente) — Run workflow
- Ej.5 (reto) hook de captura en `src/nivel-4-bdd/support/hooks.ts` + `upload-artifact` con `if: failure()`

### Issue #7 — Nivel 6 (API)

- Ej.1 `src/nivel-6-api/PostsApi.ts` (`update`) + `tests/nivel-6-api/ejercicios.spec.ts`
- Ej.2 `src/nivel-6-api/UsersApi.ts` + fixture + `tests/nivel-6-api/users.spec.ts`
- Ej.3 y Ej.4 en `tests/nivel-6-api/ejercicios.spec.ts`
- Ej.5 (reto) `tests/nivel-6-api/api-ui.spec.ts`

---

Detalle pedagógico de cada punto: ver los `.md` en **[`guias/`](guias/)**.
