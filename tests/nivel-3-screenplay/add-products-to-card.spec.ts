import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';

test.describe('Agregar producto al carrito', () => {
  test('el actor agrega un producto al carrito y verifica que el badge del carrito muestra 1', async ({
    page,
  }) => {
    const mily = Actor.named('Mily').whoCan(BrowseTheWeb.using(page));

    await mily.attemptsTo(
      LoginAs.credentials('standard_user', 'secret_sauce'),
      AddProductToCart.backpack(),
    );

    //Aserción
    expect(await mily.asksFor(CartBadgeCount.displayed())).toBe(1);

    //Aserción del valor
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
