import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

/**
 * Suite de ejemplo: inicio de sesión en SauceDemo.
 * Sirve como referencia del patrón POM + fixtures para la capacitación.
 */
test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('agregar producto y validar carrito', async ({ inventoryPage }) => {
    await inventoryPage.agregaProducto(products.backpack);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('Producto agregado se ve en carrito', async ({ inventoryPage, cartPage }) => {
    const producto = products.bolttshirt;
    await inventoryPage.agregaProducto(producto);
    await expect(inventoryPage.cartBadge).toHaveText('1');
    await inventoryPage.OpenCart();

    await expect(cartPage.titulo).toHaveText('Your Cart');
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemByName(producto)).toBeVisible();
  });
});
