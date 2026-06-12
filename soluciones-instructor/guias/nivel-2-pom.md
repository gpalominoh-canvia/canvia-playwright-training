# Nivel 2 — Page Object Model (Issue #3)

Carpetas: `src/nivel-2-pom/`, `tests/nivel-2-pom/`. Ejecutar el nivel:

```bash
npm run test:nivel-2
```

El patrón ya existe (`BasePage`, `LoginPage`, `InventoryPage`, fixture, `data/users`).
Los ejercicios **extienden** ese scaffold.

---

## 1. Crear `CartPage`

Nuevo Page Object para la página del carrito.

```ts
// src/nivel-2-pom/pages/CartPage.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/** Page Object de la página del carrito de SauceDemo. */
export class CartPage extends BasePage {
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /** Abre la página del carrito haciendo clic en el ícono. */
  async open(): Promise<void> {
    await this.cartLink.click();
  }

  /** Número que muestra el badge del carrito (0 si no existe). */
  async getBadgeCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) return 0;
    return Number((await this.cartBadge.textContent())?.trim() ?? '0');
  }

  /** Cantidad de líneas de producto dentro del carrito. */
  async getItemsCount(): Promise<number> {
    return this.cartItems.count();
  }
}
```

---

## 2. Método para agregar producto + test del contador

Agregar un método a `InventoryPage` que reciba el **nombre** del producto.

```ts
// src/nivel-2-pom/pages/InventoryPage.ts  (añadir dentro de la clase)
/** Agrega un producto al carrito por su nombre visible. */
async addProductByName(name: string): Promise<void> {
  const item = this.page.locator('.inventory_item').filter({ hasText: name });
  await item.getByRole('button', { name: 'Add to cart' }).click();
}

/** Número del badge del carrito (0 si está vacío). */
async getCartBadgeCount(): Promise<number> {
  const badge = this.page.locator('.shopping_cart_badge');
  if ((await badge.count()) === 0) return 0;
  return Number((await badge.textContent())?.trim() ?? '0');
}
```

> Para usar `this.page` desde `InventoryPage`, recuerda que `BasePage` lo declara
> `protected`, así que ya está disponible en la subclase.

Test del contador:

```ts
// tests/nivel-2-pom/cart.spec.ts
import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

test.describe('Carrito (POM)', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('agregar un producto incrementa el contador del carrito', async ({ inventoryPage }) => {
    expect(await inventoryPage.getCartBadgeCount()).toBe(0);

    await inventoryPage.addProductByName(products.backpack);

    expect(await inventoryPage.getCartBadgeCount()).toBe(1);
  });
});
```

---

## 3. Exponer `CartPage` por el fixture

```ts
// src/nivel-2-pom/fixtures/pages.fixture.ts
import { test as base } from '@playwright/test';
import { LoginPage } from '@pom/pages/LoginPage';
import { InventoryPage } from '@pom/pages/InventoryPage';
import { CartPage } from '@pom/pages/CartPage';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect } from '@playwright/test';
```

---

## 4. Mover nombres de productos a `data`

```ts
// src/nivel-2-pom/data/products.ts
/** Nombres visibles de los productos de SauceDemo (datos de prueba). */
export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTshirt: 'Sauce Labs Bolt T-Shirt',
  fleeceJacket: 'Sauce Labs Fleece Jacket',
  onesie: 'Sauce Labs Onesie',
  redTshirt: 'Test.allTheThings() T-Shirt (Red)',
} as const;
```

Así los tests no repiten strings mágicos (ya se usa en el test del punto 2).

---

## 5. (Reto) Refactorizar el reto del Nivel 1 con Page Objects

El reto del Nivel 1 (agregar producto + validar badge) ahora **sin tocar
selectores** en el test: todo vive en los Page Objects y datos.

```ts
// tests/nivel-2-pom/cart.spec.ts  (test adicional)
test('reto N1 refactorizado: badge en 1 tras agregar (POM)', async ({
  inventoryPage,
  cartPage,
}) => {
  await inventoryPage.addProductByName(products.backpack);

  expect(await cartPage.getBadgeCount()).toBe(1);

  await cartPage.open();
  expect(await cartPage.getItemsCount()).toBe(1);
});
```

Ejecutar solo el carrito:

```bash
npx playwright test --project=nivel-2-pom cart.spec.ts
```

## Notas para explicar

- **POM = encapsular selectores y acciones**: el test se lee en lenguaje de
  negocio (`addProductByName`, `getBadgeCount`) sin un solo `data-test`.
- `addProductByName` con `.filter({ hasText: name })` + `getByRole('button')`
  es más robusto que construir el `data-test="add-to-cart-..."` a mano (que
  depende del _slug_ del nombre).
- **Fixtures**: instancian los Page Objects una vez por test; el alumno solo
  pide `{ cartPage }` y lo recibe listo.
- **Datos fuera del código**: `data/products.ts` y `data/users.ts` separan el
  _qué_ (datos) del _cómo_ (acciones).

## Errores típicos del alumno

- Dejar selectores sueltos en el test (rompe el patrón POM).
- Construir el `data-test` del botón con string concatenado y que falle por el
  slug (espacios, paréntesis, `.`).
- No exponer `CartPage` en el fixture e instanciarla con `new` en el test.
