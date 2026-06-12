# Reto Nivel 3 — Verificar ordenamiento y vaciar el carrito (Issue #27)

Reutiliza las piezas del Nivel 3 (`Select`, `AddProductToCart`, `CartBadgeCount`,
los Targets de `InventoryPage`). Carpetas: `src/nivel-3-screenplay/`,
`tests/nivel-3-screenplay/`. Ejecutar:

```bash
npm run test:nivel-3
npx playwright test --project=nivel-3-screenplay orden-carrito.spec.ts
```

> **Prerrequisito**: tener hechas las piezas del [Nivel 3](nivel-3-screenplay.md)
> (`Select`, `AddProductToCart`, `CartBadgeCount` y los Targets `SORT_DROPDOWN`,
> `PRICES`, `ADD_BACKPACK`, `REMOVE_BACKPACK`, `CART_BADGE`).

---

## 1. Question `ProductPrices`

Devuelve la lista de precios visibles como `number[]` (limpia el `$`).

```ts
// src/nivel-3-screenplay/questions/ProductPrices.ts
import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { InventoryPage } from '../ui/InventoryPage';

/** Question: precios del inventario como números (sin el símbolo $). */
export class ProductPrices implements Question<number[]> {
  static displayed(): ProductPrices {
    return new ProductPrices();
  }

  async answeredBy(actor: Actor): Promise<number[]> {
    const textos = await actor
      .abilityTo(BrowseTheWeb)
      .locate(InventoryPage.PRICES)
      .allTextContents();
    return textos.map((t) => Number(t.replace('$', '').trim()));
  }
}
```

---

## 2. Test de ordenamiento ascendente

```ts
// tests/nivel-3-screenplay/orden-carrito.spec.ts
import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { RemoveProductFromCart } from '@screenplay/tasks/RemoveProductFromCart';
import { Select } from '@screenplay/interactions/Select';
import { ProductPrices } from '@screenplay/questions/ProductPrices';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';
import { InventoryPage } from '@screenplay/ui/InventoryPage';

test.describe('Reto N3 — orden y carrito', () => {
  test.beforeEach(async ({ page }) => {
    const actor = Actor.named('QA').whoCan(BrowseTheWeb.using(page));
    await actor.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));
    // guardamos el actor en el test vía closure
    (test.info() as any).actor = actor;
  });

  test('ordena de menor a mayor con "Price (low to high)"', async ({ page }) => {
    const qa = Actor.named('QA').whoCan(BrowseTheWeb.using(page));
    await qa.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    await qa.attemptsTo(Select.option('Price (low to high)').from(InventoryPage.SORT_DROPDOWN));

    const precios = await qa.asksFor(ProductPrices.displayed());
    expect(precios).toEqual([...precios].sort((a, b) => a - b));
  });
```

> Nota didáctica: por claridad, en cada test creamos el actor (Screenplay puro,
> sin fixture). En clase puedes simplificar con un helper `nuevoActor(page)`.

---

## 3. Test de ordenamiento descendente

```ts
test('ordena de mayor a menor con "Price (high to low)"', async ({ page }) => {
  const qa = Actor.named('QA').whoCan(BrowseTheWeb.using(page));
  await qa.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

  await qa.attemptsTo(Select.option('Price (high to low)').from(InventoryPage.SORT_DROPDOWN));

  const precios = await qa.asksFor(ProductPrices.displayed());
  expect(precios).toEqual([...precios].sort((a, b) => b - a));
});
```

---

## 4. Task `RemoveProductFromCart`

Simétrica a `AddProductToCart`.

```ts
// src/nivel-3-screenplay/tasks/RemoveProductFromCart.ts
import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Target } from '../core/Target';
import { Click } from '../interactions/Click';

/**
 * Task: quitar un producto del carrito. Recibe el Target del botón "Remove"
 * (p. ej. InventoryPage.REMOVE_BACKPACK).
 */
export class RemoveProductFromCart implements Performable {
  private constructor(private readonly removeButton: Target) {}

  static the(removeButton: Target): RemoveProductFromCart {
    return new RemoveProductFromCart(removeButton);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(this.removeButton));
  }
}
```

---

## 5. (Reto) Agregar, quitar y badge en 0

```ts
  test('agregar y quitar un producto deja el badge en 0', async ({ page }) => {
    const qa = Actor.named('QA').whoCan(BrowseTheWeb.using(page));
    await qa.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    await qa.attemptsTo(AddProductToCart.the(InventoryPage.ADD_BACKPACK));
    expect(await qa.asksFor(CartBadgeCount.value())).toBe(1);

    await qa.attemptsTo(RemoveProductFromCart.the(InventoryPage.REMOVE_BACKPACK));
    expect(await qa.asksFor(CartBadgeCount.value())).toBe(0);
  });
});
```

## Notas para explicar

- **`allTextContents()`** devuelve un `string[]` con el texto de cada match del
  locator: ideal para leer colecciones desde una Question.
- **Validar el orden comparando contra copia ordenada** (`[...p].sort(...)`) es
  más fiable que comprobar pares manualmente y deja claro el criterio.
- Cuando el carrito vuelve a 0, el `.shopping_cart_badge` **desaparece** del DOM;
  por eso `CartBadgeCount` chequea `count() === 0` y devuelve `0`.
- El botón cambia de `add-to-cart-...` a `remove-...` tras agregar: por eso son
  dos Targets distintos.

## Errores típicos del alumno

- Olvidar limpiar el `$` o el espacio antes de `Number(...)` → `NaN`.
- Comparar con `===` arrays (no funciona); usar `expect(...).toEqual(...)`.
- Esperar que el badge muestre "0": en realidad el elemento ya no existe.
