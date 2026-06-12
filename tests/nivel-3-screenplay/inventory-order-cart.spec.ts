import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { Select } from '@screenplay/interactions/Select';
import { ProductPrices } from '@screenplay/questions/ProductPrices';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { RemoveProductFromCart } from '@screenplay/tasks/RemoveProductFromCart';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';
import { InventoryPage } from '@screenplay/ui/InventoryPage';

test.describe('Inventario con Screenplay', () => {
  test('ordena productos por precio de menor a mayor', async ({ page }) => {
    const erick = Actor.named('Erick').whoCan(BrowseTheWeb.using(page));

    await erick.attemptsTo(
      LoginAs.credentials('standard_user', 'secret_sauce'),
      Select.option('Price (low to high)').from(InventoryPage.SORT_DROPDOWN),
    );

    const prices = await erick.asksFor(ProductPrices.visible());
    const sortedPrices = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sortedPrices);
  });

  test('ordena productos por precio de mayor a menor', async ({ page }) => {
    const erick = Actor.named('Erick').whoCan(BrowseTheWeb.using(page));

    await erick.attemptsTo(
      LoginAs.credentials('standard_user', 'secret_sauce'),
      Select.option('Price (high to low)').from(InventoryPage.SORT_DROPDOWN),
    );

    const prices = await erick.asksFor(ProductPrices.visible());
    const sortedPrices = [...prices].sort((a, b) => b - a);

    expect(prices).toEqual(sortedPrices);
  });

  test('agrega y quita un producto validando el badge del carrito', async ({ page }) => {
    const erick = Actor.named('Erick').whoCan(BrowseTheWeb.using(page));

    await erick.attemptsTo(
      LoginAs.credentials('standard_user', 'secret_sauce'),
      AddProductToCart.backpack(),
    );

    expect(await erick.asksFor(CartBadgeCount.value())).toBe(1);

    await erick.attemptsTo(RemoveProductFromCart.backpack());

    expect(await erick.asksFor(CartBadgeCount.value())).toBe(0);
  });
});
