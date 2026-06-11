import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';

import { LoginAs } from '@screenplay/tasks/LoginAs';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { CartBadgeCount } from '@screenplay/questions/CartBageCount';

test.describe('Agregar producto al carrito', () => {
  test('El actor agrega un producto al carrito y verifica que el page del carrito muestra 1', async ({
    page,
  }) => {
    const Andrea = Actor.named('Andrea').whoCan(BrowseTheWeb.using(page));

    await Andrea.attemptsTo(
      LoginAs.credentials('standard_user', 'secret_sauce'),
      AddProductToCart.backpack(),
    );
    //Asserts
    expect(await Andrea.asksFor(CartBadgeCount.displayed())).toBe(1);
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  });
});
