import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

test.describe('cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('Validar boton de regreso del carrito de compras', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goToCart();
    await cartPage.clickContinueShopping();
    const title = await cartPage.getHeaderTitle();
    expect(title).toBe('Products');
  });

  test('Validar boton de checkout del carrito de compras', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goToCart();
    await cartPage.clickContinueShopping();
    const title = await cartPage.getHeaderTitle();
    expect(title).toBe('Products');
  });

  test('Validar', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.expectCartBadgeCount(1);
    await inventoryPage.addItemToCart(products.bike_light);
    await inventoryPage.expectCartBadgeCount(2);
    await inventoryPage.goToCart();
    await cartPage.expectCartTitle();
  });
});
