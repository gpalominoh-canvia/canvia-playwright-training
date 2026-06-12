import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { RemoveProductFromCart } from '@screenplay/tasks/RemoveProductFromCart';
import { Select } from '@screenplay/interactions/Select';
import { InventoryPage } from '@screenplay/ui/InventoryPage';
import { ProductPrices } from '@screenplay/questions/ProductPrices';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';

test.describe('Ordenamiento de productos', () => {
  test('ordena los precios de menor a mayor', async ({ page }) => {
    const mily = Actor.named('Mily').whoCan(BrowseTheWeb.using(page));

    await mily.attemptsTo(
      LoginAs.credentials('standard_user', 'secret_sauce'),
      Select.options('Price (low to high)').from(InventoryPage.SORT_DROPDOWN),
    );

    const precios = await mily.asksFor(ProductPrices.displayed());
    const ordenadosAsc = [...precios].sort((a, b) => a - b);

    expect(precios).toEqual(ordenadosAsc);
  });

  test('ordena los precios de mayor a menor', async ({ page }) => {
    const mily = Actor.named('Mily').whoCan(BrowseTheWeb.using(page));

    await mily.attemptsTo(
      LoginAs.credentials('standard_user', 'secret_sauce'),
      Select.options('Price (high to low)').from(InventoryPage.SORT_DROPDOWN),
    );

    const precios = await mily.asksFor(ProductPrices.displayed());
    const ordenadosDesc = [...precios].sort((a, b) => b - a);

    expect(precios).toEqual(ordenadosDesc);
  });
});

test.describe('Carrito: agregar y quitar producto', () => {
  test('el badge vuelve a 0 al quitar el producto agregado', async ({ page }) => {
    const mily = Actor.named('Mily').whoCan(BrowseTheWeb.using(page));

    await mily.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    // Agrega y verifica badge = 1
    await mily.attemptsTo(AddProductToCart.backpack());
    expect(await mily.asksFor(CartBadgeCount.displayed())).toBe(1);

    // Quita y verifica badge = 0
    await mily.attemptsTo(RemoveProductFromCart.backpack());
    expect(await mily.asksFor(CartBadgeCount.displayed())).toBe(0);
  });
});
