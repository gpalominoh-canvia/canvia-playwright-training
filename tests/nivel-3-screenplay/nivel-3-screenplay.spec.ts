import { test, expect } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { LoginAs } from '@screenplay/tasks/LoginAs';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { Logout } from '@screenplay/tasks/Logout';
import { Select } from '@screenplay/interactions/Select';
import { InventoryPage } from '@screenplay/ui/InventoryPage';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';
import { CurrentUrl } from '@screenplay/questions/CurrentUrl';
import { IsOnLoginPage } from '@screenplay/questions/IsOnLoginPage';

test.describe('Screenplay Reto', () => {
  test('El Actor inicia sesion , ordena los productos y agrega un producto al carrito', async ({
    page,
  }) => {
    const david = Actor.named('David').whoCan(BrowseTheWeb.using(page));

    await david.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    // Asercion de URL
    expect(await david.asksFor(CurrentUrl.displayed())).toContain('/inventory.html');

    await david.attemptsTo(
      Select.options('Price (low to high)').from(InventoryPage.SORT_DROPDOWN),
      AddProductToCart.theBackpack(),
    );

    // Asercion del badge del carrito
    expect(await david.asksFor(CartBadgeCount.displayed())).toBe(1);
  });

  test('Reto: Logout', async ({ page }) => {
    const marco = Actor.named('Marco').whoCan(BrowseTheWeb.using(page));

    await marco.attemptsTo(
      LoginAs.credentials('standard_user', 'secret_sauce'),
      Logout.fromTheApp(),
    );

    // Question Asercion
    expect(await marco.asksFor(IsOnLoginPage.displayed())).toBe(true);
    expect(await marco.asksFor(CurrentUrl.displayed())).toContain('https://www.saucedemo.com/');
  });
});
