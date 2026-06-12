import { test, expect, type Page } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { RemoveProductFromCart } from '@screenplay/tasks/RemoveProductFromCart';
import { Select } from '@screenplay/interactions/Select';
import { ProductPrices } from '@screenplay/questions/ProductPrices';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';
import { InventoryPage } from '@screenplay/ui/InventoryPage';

/**
 * RETO NIVEL 3 (Issue #27): verificar que el ordenamiento realmente ordena y
 * que se puede vaciar el carrito, reutilizando Select, AddProductToCart,
 * RemoveProductFromCart, ProductPrices y CartBadgeCount.
 */
function nuevoActor(page: Page): Actor {
  return Actor.named('QA').whoCan(BrowseTheWeb.using(page));
}

test.describe('Reto N3 — orden y carrito', () => {
  // Ej. 2 — ordenamiento ascendente.
  test('ordena de menor a mayor con "Price (low to high)"', async ({ page }) => {
    const qa = nuevoActor(page);
    await qa.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    await qa.attemptsTo(Select.option('Price (low to high)').from(InventoryPage.SORT_DROPDOWN));

    const precios = await qa.asksFor(ProductPrices.displayed());
    expect(precios).toEqual([...precios].sort((a, b) => a - b));
  });

  // Ej. 3 — ordenamiento descendente.
  test('ordena de mayor a menor con "Price (high to low)"', async ({ page }) => {
    const qa = nuevoActor(page);
    await qa.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    await qa.attemptsTo(Select.option('Price (high to low)').from(InventoryPage.SORT_DROPDOWN));

    const precios = await qa.asksFor(ProductPrices.displayed());
    expect(precios).toEqual([...precios].sort((a, b) => b - a));
  });

  // Ej. 4 y 5 — agregar, quitar y verificar que el badge vuelve a 0.
  test('agregar y quitar un producto deja el badge en 0', async ({ page }) => {
    const qa = nuevoActor(page);
    await qa.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    await qa.attemptsTo(AddProductToCart.the(InventoryPage.ADD_BACKPACK));
    expect(await qa.asksFor(CartBadgeCount.value())).toBe(1);

    await qa.attemptsTo(RemoveProductFromCart.the(InventoryPage.REMOVE_BACKPACK));
    expect(await qa.asksFor(CartBadgeCount.value())).toBe(0);
  });
});
