import { test } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

test.describe('inventory', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('agregar producto y validar badge', async ({ inventoryPage }) => {
    await inventoryPage.addItemToCart(products.backpack);
    await inventoryPage.expectCartBadgeCount(1);
  });
});
