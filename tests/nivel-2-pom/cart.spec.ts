import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

test.describe('Carrito', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('agrega un producto al carrito y valida el contador', async ({
    loginPage,
    inventoryPage,
    cartPage,
  }) => {
    await loginPage.login(users.standard.username, users.standard.password);

    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.openCart();

    expect(await cartPage.getHeaderTitle()).toBe('Your Cart');
    expect(await cartPage.getItemsCount()).toBe(1);
  });
});
