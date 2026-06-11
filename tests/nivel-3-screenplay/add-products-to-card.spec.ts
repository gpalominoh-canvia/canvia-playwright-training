import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';

test.describe('Agregar producto al carrito', () => {
  test('el actor agrega un prodcuto al carrito y verifica que el badge del carriot muestra 1', async ({
    page,
  }) => {
    const erick = Actor.named('Erick').whoCan(BrowseTheWeb.using(page));

    await erick.attemptsTo(
      LoginAs.credentials('standard_user', 'secret_sauce'),
      AddProductToCart.theBackpack(),
    );

    // Asercion
    expect(await erick.asksFor(CartBadgeCount.displayed())).toBe(1);
    // Asercion del valor
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
