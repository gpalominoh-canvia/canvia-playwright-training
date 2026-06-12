# Nivel 4 — BDD con Cucumber (Issue #5)

Carpetas: `src/nivel-4-bdd/`, `tests/nivel-4-bdd/`. Perfil `default` de
`cucumber.js`. Ejecutar:

```bash
npm run test:nivel-4
```

Los steps manipulan la página directamente (`this.page`). Reaprovechamos el
`world.ts` y `hooks.ts` existentes.

---

## 1. Escenario de logout + step definitions

Agregar al `tests/nivel-4-bdd/login.feature`:

```gherkin
  Escenario: Cierre de sesión
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"
    Y cierro sesión
    Entonces debería volver a la página de login
```

Nuevos steps (en `src/nivel-4-bdd/steps/login.steps.ts`):

```ts
When('cierro sesión', async function (this: CustomWorld) {
  await this.page.locator('#react-burger-menu-btn').click();
  await this.page.locator('#logout_sidebar_link').click();
});

Then('debería volver a la página de login', async function (this: CustomWorld) {
  await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
});
```

> El step `Cuando inicio sesión con usuario ... y contraseña ...` **ya existe**
> y se reutiliza tal cual (eso es el ejercicio 5).

---

## 2. `carrito.feature` con etiqueta `@carrito`

```gherkin
# tests/nivel-4-bdd/carrito.feature
# language: es
@carrito
Característica: Carrito de compras
  Como usuario autenticado
  Quiero agregar productos al carrito
  Para comprarlos después

  Antecedentes:
    Dado que estoy en la página de login
    Cuando inicio sesión con usuario "standard_user" y contraseña "secret_sauce"

  Escenario: Agregar un producto al carrito
    Cuando agrego el producto "Sauce Labs Backpack" al carrito
    Entonces el contador del carrito debería mostrar "1"
```

Steps nuevos (`src/nivel-4-bdd/steps/carrito.steps.ts`):

```ts
// src/nivel-4-bdd/steps/carrito.steps.ts
import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

When('agrego el producto {string} al carrito', async function (this: CustomWorld, nombre: string) {
  const item = this.page.locator('.inventory_item').filter({ hasText: nombre });
  await item.getByRole('button', { name: 'Add to cart' }).click();
});

Then(
  'el contador del carrito debería mostrar {string}',
  async function (this: CustomWorld, cantidad: string) {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText(cantidad);
  },
);
```

> La etiqueta `@carrito` está a nivel de Característica, así que aplica a todos
> sus escenarios.

---

## 3. Scenario Outline para varios usuarios inválidos

El `login.feature` ya trae un esqueleto; amplía los ejemplos:

```gherkin
  Esquema del escenario: Validación de credenciales inválidas
    Cuando inicio sesión con usuario "<usuario>" y contraseña "<contrasena>"
    Entonces debería ver el mensaje de error "Username and password do not match"

    Ejemplos:
      | usuario       | contrasena   |
      | usuario_x     | clave_y      |
      | otro_usuario  | otra_clave   |
      | ""            | secret_sauce |
      | standard_user | ""           |
```

> Ojo: para usuario/clave vacíos SauceDemo devuelve **otro** mensaje
> ("Username is required" / "Password is required"). Si quieres incluir esos
> casos, usa un `Esquema` aparte con su propio `Entonces` y una columna `error`.

Versión correcta con mensaje parametrizado:

```gherkin
  Esquema del escenario: Mensajes según credencial faltante
    Cuando inicio sesión con usuario "<usuario>" y contraseña "<contrasena>"
    Entonces debería ver el mensaje de error "<error>"

    Ejemplos:
      | usuario       | contrasena   | error                                   |
      | usuario_x     | clave_y      | Username and password do not match      |
      | ""            | secret_sauce | Username is required                    |
      | standard_user | ""           | Password is required                    |
```

---

## 4. Ejecutar solo `@carrito`

```bash
npm run test:nivel-4 -- --tags @carrito
```

Combinar tags (ej. carrito pero no los marcados `@wip`):

```bash
npm run test:nivel-4 -- --tags "@carrito and not @wip"
```

---

## 5. (Reto) Reutilizar steps sin duplicar redacción

La clave: **mismo texto de step = misma definición**. El escenario de logout y
el de carrito reutilizan el step `Cuando inicio sesión con usuario ... y
contraseña ...` que ya existe en `login.steps.ts`. No lo redefinas: si dos
archivos registran el mismo patrón, Cucumber lanza _ambiguous step_.

Buenas prácticas mostradas:

- **Steps parametrizados** con `{string}` en vez de uno por valor.
- **Antecedentes** (`Background`) para el login común a todos los escenarios.
- Steps **declarativos** ("agrego el producto X") en vez de imperativos
  ("hago clic en el botón add-to-cart-...").

## Notas para explicar

- `# language: es` habilita las palabras clave en español
  (Característica/Escenario/Dado/Cuando/Entonces/Y/Esquema del escenario/Ejemplos).
- Cada nivel usa su **perfil** de Cucumber para aislar steps (ver `cucumber.js`);
  por eso el Nivel 4 no choca con el 4.1 aunque compartan textos.
- El reporte HTML queda en `playwright-report/cucumber.html`.

## Errores típicos del alumno

- Duplicar el step de login con otra redacción → _ambiguous_/duplicado.
- Meter el caso de usuario vacío con el mensaje "do not match" (el real es
  "Username is required").
- Olvidar `# language: es` y escribir keywords en inglés.
