import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

test.describe('carrito', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('elimina un prodcuto y valida el badge', async ({ page, loginPage, inventoryPage }) => {
    const cartBadge = page.locator('data-test=shopping-cart-badge');
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addProductToCart(products.backpack);
    await expect(cartBadge).toHaveText('1');
    await inventoryPage.removeProductFromCart(products.backpack);
    await expect(cartBadge).toHaveCount(0);
  });
});
