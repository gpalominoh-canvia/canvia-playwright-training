# Nivel 3 — Screenplay (Issue #4)

Carpetas: `src/nivel-3-screenplay/`, `tests/nivel-3-screenplay/`. Ejecutar:

```bash
npm run test:nivel-3
```

Vocabulario del patrón: **Actor** (usuario) · **Ability** (poder, p. ej.
`BrowseTheWeb`) · **Interaction** (acción atómica) · **Task** (acción de negocio
que compone interactions) · **Question** (lectura del sistema para aserciones) ·
**Target** (nombre legible + selector).

Primero ampliamos los Targets que usarán las piezas nuevas:

```ts
// src/nivel-3-screenplay/ui/InventoryPage.ts
import { Target } from '../core/Target';

export const InventoryPage = {
  TITLE: Target.the('título de la sección').locatedBy('.title'),
  ITEMS: Target.the('productos del inventario').locatedBy('.inventory_item'),
  SORT_DROPDOWN: Target.the('combo de orden').locatedBy('[data-test="product-sort-container"]'),
  PRICES: Target.the('precios del inventario').locatedBy('[data-test="inventory-item-price"]'),
  ADD_BACKPACK: Target.the('agregar mochila').locatedBy(
    '[data-test="add-to-cart-sauce-labs-backpack"]',
  ),
  REMOVE_BACKPACK: Target.the('quitar mochila').locatedBy(
    '[data-test="remove-sauce-labs-backpack"]',
  ),
  CART_BADGE: Target.the('badge del carrito').locatedBy('.shopping_cart_badge'),
};
```

```ts
// src/nivel-3-screenplay/ui/LoginPage.ts  (añadir los del menú)
export const LoginPage = {
  USERNAME: Target.the('campo usuario').locatedBy('[data-test="username"]'),
  PASSWORD: Target.the('campo contraseña').locatedBy('[data-test="password"]'),
  LOGIN_BUTTON: Target.the('botón login').locatedBy('[data-test="login-button"]'),
  ERROR_MESSAGE: Target.the('mensaje de error').locatedBy('[data-test="error"]'),
  MENU_BUTTON: Target.the('botón menú').locatedBy('#react-burger-menu-btn'),
  LOGOUT_LINK: Target.the('link logout').locatedBy('#logout_sidebar_link'),
};
```

---

## 1. Question `CurrentUrl`

```ts
// src/nivel-3-screenplay/questions/CurrentUrl.ts
import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/** Question: la URL actual del navegador. */
export class CurrentUrl implements Question<string> {
  static value(): CurrentUrl {
    return new CurrentUrl();
  }

  async answeredBy(actor: Actor): Promise<string> {
    return actor.abilityTo(BrowseTheWeb).page.url();
  }
}
```

---

## 2. Interaction `Select` (combo de ordenamiento)

```ts
// src/nivel-3-screenplay/interactions/Select.ts
import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Target } from '../core/Target';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * Interaction: elegir una opción de un <select> por su etiqueta visible.
 * Uso: Select.option('Price (low to high)').from(InventoryPage.SORT_DROPDOWN)
 */
export class Select implements Performable {
  private constructor(
    private readonly label: string,
    private readonly target: Target,
  ) {}

  static option(label: string): { from: (target: Target) => Select } {
    return {
      from: (target: Target) => new Select(label, target),
    };
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.abilityTo(BrowseTheWeb).locate(this.target).selectOption({ label: this.label });
  }
}
```

---

## 3. Task `AddProductToCart`

```ts
// src/nivel-3-screenplay/tasks/AddProductToCart.ts
import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Target } from '../core/Target';
import { Click } from '../interactions/Click';

/**
 * Task: agregar un producto al carrito. Recibe el Target del botón "Add to cart"
 * del producto (p. ej. InventoryPage.ADD_BACKPACK).
 * Uso: actor.attemptsTo(AddProductToCart.the(InventoryPage.ADD_BACKPACK))
 */
export class AddProductToCart implements Performable {
  private constructor(private readonly addButton: Target) {}

  static the(addButton: Target): AddProductToCart {
    return new AddProductToCart(addButton);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(this.addButton));
  }
}
```

Question auxiliar para el badge (la reutiliza el Reto #27):

```ts
// src/nivel-3-screenplay/questions/CartBadgeCount.ts
import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { InventoryPage } from '../ui/InventoryPage';

/** Question: número del badge del carrito (0 si no existe en el DOM). */
export class CartBadgeCount implements Question<number> {
  static value(): CartBadgeCount {
    return new CartBadgeCount();
  }

  async answeredBy(actor: Actor): Promise<number> {
    const badge = actor.abilityTo(BrowseTheWeb).locate(InventoryPage.CART_BADGE);
    if ((await badge.count()) === 0) return 0;
    return Number((await badge.textContent())?.trim() ?? '0');
  }
}
```

---

## 4. Test de comportamiento combinando las piezas

```ts
// tests/nivel-3-screenplay/inventario.spec.ts
import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { Select } from '@screenplay/interactions/Select';
import { CurrentUrl } from '@screenplay/questions/CurrentUrl';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';
import { InventoryPage } from '@screenplay/ui/InventoryPage';

test.describe('Inventario con Screenplay', () => {
  test('el actor inicia sesión, ordena y agrega un producto', async ({ page }) => {
    const qa = Actor.named('QA').whoCan(BrowseTheWeb.using(page));

    await qa.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));
    expect(await qa.asksFor(CurrentUrl.value())).toContain('/inventory.html');

    await qa.attemptsTo(Select.option('Price (low to high)').from(InventoryPage.SORT_DROPDOWN));

    await qa.attemptsTo(AddProductToCart.the(InventoryPage.ADD_BACKPACK));
    expect(await qa.asksFor(CartBadgeCount.value())).toBe(1);
  });
});
```

---

## 5. (Reto) Task `Logout` + Question `IsOnLoginPage`

```ts
// src/nivel-3-screenplay/tasks/Logout.ts
import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Click } from '../interactions/Click';
import { LoginPage } from '../ui/LoginPage';

/** Task: cerrar sesión (abrir menú y pulsar Logout). */
export class Logout implements Performable {
  static now(): Logout {
    return new Logout();
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(LoginPage.MENU_BUTTON), Click.on(LoginPage.LOGOUT_LINK));
  }
}
```

```ts
// src/nivel-3-screenplay/questions/IsOnLoginPage.ts
import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { LoginPage } from '../ui/LoginPage';

/** Question: ¿estamos en la página de login? (botón de login visible). */
export class IsOnLoginPage implements Question<boolean> {
  static value(): IsOnLoginPage {
    return new IsOnLoginPage();
  }

  async answeredBy(actor: Actor): Promise<boolean> {
    return actor.abilityTo(BrowseTheWeb).locate(LoginPage.LOGIN_BUTTON).isVisible();
  }
}
```

Test del reto:

```ts
// tests/nivel-3-screenplay/logout.spec.ts
import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { Logout } from '@screenplay/tasks/Logout';
import { IsOnLoginPage } from '@screenplay/questions/IsOnLoginPage';

test('el actor cierra sesión y vuelve al login', async ({ page }) => {
  const qa = Actor.named('QA').whoCan(BrowseTheWeb.using(page));

  await qa.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));
  await qa.attemptsTo(Logout.now());

  expect(await qa.asksFor(IsOnLoginPage.value())).toBe(true);
});
```

## Notas para explicar

- **Interaction vs Task**: `Select`/`Click` son atómicas; `AddProductToCart`,
  `Logout` y `LoginAs` componen interactions en una intención de negocio.
- Una **Task delega en otras** vía `actor.attemptsTo(...)` (mira `LoginAs`).
- Las **Questions devuelven valor tipado** (`string`, `number`, `boolean`) para
  que la aserción viva en el test, no dentro de la pieza.
- Los **selectores nunca aparecen** en tasks/questions/tests: viven en los
  Targets de `ui/`.

## Errores típicos del alumno

- Meter `expect` dentro de una Task/Question (rompe la separación de roles).
- Poner selectores literales en la Task en vez de un Target.
- `CartBadgeCount` que peta cuando el badge no existe (carrito vacío): hay que
  chequear `count() === 0` primero.
