import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { Select } from '@screenplay/interactions/Select';
import { InventoryPage } from '@screenplay/ui/InventoryPage';
import { ProductPrices } from '@screenplay/questions/ProductsPrices';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { CartBadgeCount } from '@screenplay/questions/CartBageCount';
import { RemoveProductFromCart } from '@screenplay/tasks/RemoveProductFromCart';

test.describe('Ordenamiento de productos', () => {
  test('ordenar precios de menor a mayor', async ({ page }) => {
    const andrea = Actor.named('Andrea').whoCan(BrowseTheWeb.using(page));

    await andrea.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    await andrea.attemptsTo(Select.option('Price (low to high)').from(InventoryPage.SORT_DROPDOWN));
    const actualPrices = await andrea.asksFor(ProductPrices.displayed());

    const expectedPrices = [...actualPrices].sort((a, b) => a - b);
    expect(actualPrices).toEqual(expectedPrices);
  });

  test('ordenar precios de mayor a menor', async ({ page }) => {
    const andrea = Actor.named('Andrea').whoCan(BrowseTheWeb.using(page));

    await andrea.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    await andrea.attemptsTo(Select.option('Price (high to low)').from(InventoryPage.SORT_DROPDOWN));

    const actualPrices = await andrea.asksFor(ProductPrices.displayed());

    const expectedPrices = [...actualPrices].sort((a, b) => b - a);

    expect(actualPrices).toEqual(expectedPrices);
  });

  //REMOVER
  test('agregar y quitar producto del carrito', async ({ page }) => {
    const ANDREA = Actor.named('Andrea').whoCan(BrowseTheWeb.using(page));

    await ANDREA.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    await ANDREA.attemptsTo(AddProductToCart.backpack());

    expect(await ANDREA.asksFor(CartBadgeCount.displayed())).toBe(1);

    await ANDREA.attemptsTo(RemoveProductFromCart.backpack());

    expect(await ANDREA.asksFor(CartBadgeCount.displayed())).toBe(0);
  });
});
