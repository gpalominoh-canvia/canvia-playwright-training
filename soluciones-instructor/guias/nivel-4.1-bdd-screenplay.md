# Nivel 4.1 — BDD + Screenplay (Issue #35)

Carpetas: `src/nivel-4.1-bdd-screenplay/`, `tests/nivel-4.1-bdd-screenplay/`.
Perfil `nivel41` de `cucumber.js`. Ejecutar:

```bash
npm run test:nivel-4.1
```

> **Prerrequisito**: tener resuelto el [Nivel 3](nivel-3-screenplay.md)
> (`AddProductToCart`, `CartBadgeCount`, `Logout`, `CurrentUrl`, Targets). El
> Nivel 4.1 los **importa desde `@screenplay`** — ahí está la reutilización.
>
> Idea del nivel: el `.feature` describe el **qué**; el Actor ejecuta el
> **cómo**. **Los steps no llevan selectores.**

---

## 1. Steps sin selectores (reescribir un escenario)

El `login.steps.ts` del scaffold ya delega en el Actor (es la referencia). El
contraste a explicar es Nivel 4 → 4.1:

```ts
// ❌ Nivel 4: el step toca la página y conoce el selector
When('inicio sesión con usuario {string} ...', async function (this: CustomWorld, u, p) {
  await this.page.locator('[data-test="username"]').fill(u);
  await this.page.locator('[data-test="password"]').fill(p);
  await this.page.locator('[data-test="login-button"]').click();
});

// ✅ Nivel 4.1: el step delega en una Task; sin selectores
When('inicio sesión con usuario {string} ...', async function (this: ScreenplayWorld, u, p) {
  await this.actor.attemptsTo(LoginAs.credentials(u, p));
});
```

---

## 2. `carrito.feature` con Task `AddProductToCart` + Question del badge

```gherkin
# tests/nivel-4.1-bdd-screenplay/carrito.feature
# language: es
@carrito
Característica: Carrito (BDD + Screenplay)
  Como usuario autenticado
  Quiero agregar productos al carrito
  Para comprarlos después

  Antecedentes:
    Dado que estoy en la página de login
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"

  Escenario: Agregar la mochila al carrito
    Cuando agrego la mochila al carrito
    Entonces el contador del carrito debería ser "1"
```

Steps (sin selectores, delegando en Tasks/Questions de `@screenplay`):

```ts
// src/nivel-4.1-bdd-screenplay/steps/carrito.steps.ts
import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';
import { InventoryPage } from '@screenplay/ui/InventoryPage';
import { ScreenplayWorld } from '../support/world';

When('agrego la mochila al carrito', async function (this: ScreenplayWorld) {
  await this.actor.attemptsTo(AddProductToCart.the(InventoryPage.ADD_BACKPACK));
});

Then(
  'el contador del carrito debería ser {string}',
  async function (this: ScreenplayWorld, cantidad: string) {
    expect(await this.actor.asksFor(CartBadgeCount.value())).toBe(Number(cantidad));
  },
);
```

---

## 3. Logout reutilizando la Task `Logout` del Nivel 3

```gherkin
# añadir a tests/nivel-4.1-bdd-screenplay/login.feature
  Escenario: Cierre de sesión
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Y cierro sesión
    Entonces debería estar en la página de login
```

```ts
// src/nivel-4.1-bdd-screenplay/steps/logout.steps.ts
import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { Logout } from '@screenplay/tasks/Logout';
import { IsOnLoginPage } from '@screenplay/questions/IsOnLoginPage';
import { ScreenplayWorld } from '../support/world';

When('cierro sesión', async function (this: ScreenplayWorld) {
  await this.actor.attemptsTo(Logout.now());
});

Then('debería estar en la página de login', async function (this: ScreenplayWorld) {
  expect(await this.actor.asksFor(IsOnLoginPage.value())).toBe(true);
});
```

---

## 4. Aserción por Question (no leer `this.page`)

En vez de `await expect(this.page).toHaveURL(...)`, validamos con la Question
`CurrentUrl` del Nivel 3:

```ts
// src/nivel-4.1-bdd-screenplay/steps/login.steps.ts  (añadir)
import { CurrentUrl } from '@screenplay/questions/CurrentUrl';

Then('la URL debería contener {string}', async function (this: ScreenplayWorld, fragmento: string) {
  expect(await this.actor.asksFor(CurrentUrl.value())).toContain(fragmento);
});
```

```gherkin
  Escenario: La URL del inventario
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Entonces la URL debería contener "/inventory.html"
```

---

## 5. (Reto) Compartir Tasks/Questions entre Nivel 3 y 4.1

No hay nada que copiar: el Nivel 4.1 **importa directamente** desde
`@screenplay/*` (que apunta a `src/nivel-3-screenplay`). La misma
`AddProductToCart`, `CartBadgeCount`, `Logout`, `CurrentUrl`, `IsOnLoginPage` y
los Targets sirven a:

- los **tests** de Playwright del Nivel 3 (`tests/nivel-3-screenplay/`), y
- los **steps** de Cucumber del Nivel 4.1 (`src/nivel-4.1-bdd-screenplay/steps/`).

Una sola fuente de verdad para el _cómo_. Si cambia un selector, se toca un solo
Target y ambos niveles quedan corregidos.

## Notas para explicar

- El **World** del 4.1 expone `this.actor` (ver `support/world.ts`), creado en
  `Before` con la habilidad `BrowseTheWeb.using(this.page)` (ver `support/hooks.ts`).
- Mismo `.feature` que el Nivel 4, pero el **cómo** cambió de "tocar la página" a
  "pedirle al Actor": eso es el valor de Screenplay sobre BDD.
- Ejecutar solo carrito: `npm run test:nivel-4.1 -- --tags @carrito`.
- Reporte: `playwright-report/cucumber-nivel-4.1.html`.

## Errores típicos del alumno

- Volver a tocar `this.page` en un step "para que funcione rápido" (rompe la
  premisa del nivel).
- Redefinir Tasks/Questions dentro de `src/nivel-4.1-...` en vez de importarlas
  de `@screenplay` (duplicación que el reto pide evitar).
- Olvidar que `CartBadgeCount` devuelve `number` y comparar contra un `string`.
