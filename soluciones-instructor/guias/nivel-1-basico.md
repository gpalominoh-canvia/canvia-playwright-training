# Nivel 1 — Fundamentos de Playwright (Issue #2)

Tests **planos** (sin patrones), todo dentro del `test`. Carpeta:
`tests/nivel-1-basico/`. Ejecutar todo el nivel:

```bash
npm run test:nivel-1
```

Solución sugerida: un único archivo nuevo `tests/nivel-1-basico/03-ejercicios.spec.ts`
con los 5 ejercicios. Ejecutar solo este archivo o un test puntual:

```bash
npx playwright test --project=nivel-1-basico 03-ejercicios.spec.ts
npx playwright test --project=nivel-1-basico -g "menú"
```

```ts
// tests/nivel-1-basico/03-ejercicios.spec.ts
import { test, expect } from '@playwright/test';

/**
 * NIVEL 1 — Ejercicios (tests planos).
 * Reutilizamos un helper de login para no repetir las 3 acciones en cada test.
 */
async function login(page, user = 'standard_user', pass = 'secret_sauce') {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(user);
  await page.locator('[data-test="password"]').fill(pass);
  await page.locator('[data-test="login-button"]').click();
}

// 1. Menú visible tras login exitoso.
test('el botón de menú es visible tras iniciar sesión', async ({ page }) => {
  await login(page);
  await expect(page).toHaveURL(/inventory/);
  await expect(page.locator('#react-burger-menu-btn')).toBeVisible();
});

// 2. Mensaje de error del usuario bloqueado.
test('usuario bloqueado muestra mensaje de error', async ({ page }) => {
  await login(page, 'locked_out_user', 'secret_sauce');
  const error = page.locator('[data-test="error"]');
  await expect(error).toBeVisible();
  await expect(error).toContainText('Sorry, this user has been locked out');
});

// 3. Logout: login → menú → Logout → volver a login.
test('logout regresa a la página de login', async ({ page }) => {
  await login(page);

  await page.locator('#react-burger-menu-btn').click();
  // El link aparece al abrir el menú: esperamos a que sea visible antes del clic.
  await page.locator('#logout_sidebar_link').click();

  await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});

// 4. Ordenar por "Price (low to high)" y validar el primer precio.
test('ordenar por precio ascendente deja el menor primero', async ({ page }) => {
  await login(page);

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const textos = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  const precios = textos.map((t) => Number(t.replace('$', '')));

  // El primer precio debe ser el menor de toda la lista.
  expect(precios[0]).toBe(Math.min(...precios));
  // Y la lista completa debe estar ordenada de menor a mayor.
  expect(precios).toEqual([...precios].sort((a, b) => a - b));
});

// 5. (Reto) Agregar un producto y validar el badge del carrito.
test('agregar un producto muestra el badge en 1', async ({ page }) => {
  await login(page);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});
```

## Notas para explicar

- **Helper `login`**: en Nivel 1 todavía no hay patrones, pero una función local
  ya muestra el valor de no repetirse. En el Nivel 2 esto se convierte en POM.
- **Ej. 3 (logout)**: el `#logout_sidebar_link` solo existe en el DOM cuando el
  menú está abierto. Playwright auto-espera a que sea accionable, por eso basta
  el `.click()` encadenado; si quisieran ser explícitos:
  `await expect(page.locator('#logout_sidebar_link')).toBeVisible()`.
- **Ej. 4 (orden)**: enseñar a **no hardcodear** "$7.99". Se valida la propiedad
  (lista ordenada / primer = mínimo), que es robusta aunque cambie el catálogo.
  El `<select>` se opera con `selectOption('lohi')` (value) o
  `selectOption({ label: 'Price (low to high)' })`.
- **Ej. 5 (badge)**: el `.shopping_cart_badge` **no existe** cuando el carrito
  está vacío. Por eso se valida con `toHaveText('1')` después de agregar.

## Errores típicos del alumno

- Usar `#react-burger-menu-btn` antes del login (aún no existe) → falla.
- Hardcodear el precio en vez de validar el orden.
- Olvidar abrir el menú antes de buscar `#logout_sidebar_link`.
- Validar el badge con `toBeVisible()` sin verificar el número.
