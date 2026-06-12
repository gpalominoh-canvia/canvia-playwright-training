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
  test('el actor inicia sesion, ordena los productos y agrega un producto al carrito', async ({
    page,
  }) => {
    const david = Actor.named('David').whoCan(BrowseTheWeb.using(page));
    await david.attemptsTo(LoginAs.credentials('standard_user', 'secret_sauce'));

    //Asercion de Url
    expect(await david.asksFor(CurrentUrl.displayed())).toContain('/inventory.html');

    await david.attemptsTo(
      Select.options('Price (low to high)').from(InventoryPage.SORT_DROPDOWN),
      AddProductToCart.backpack(),
    );

    //Asersion del badge del carrito
    expect(await david.asksFor(CartBadgeCount.displayed())).toBe(1);
  });

  test('Reto: Logout', async ({ page }) => {
    const Guiancarlo = Actor.named('Giancarlo').whoCan(BrowseTheWeb.using(page));

    await Guiancarlo.attemptsTo(
      LoginAs.credentials('standard_user', 'secret_sauce'),
      Logout.fromTheApp(),
    );

    //Question Asercion
    expect(await Guiancarlo.asksFor(IsOnLoginPage.displayed())).toBe(true);
    expect(await Guiancarlo.asksFor(CurrentUrl.displayed())).toContain(
      'https://www.saucedemo.com/',
    );
  });
});
