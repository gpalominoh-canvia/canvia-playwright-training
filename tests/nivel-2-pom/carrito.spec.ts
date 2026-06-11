import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

/**
 * Suite de ejemplo: inicio de sesión en SauceDemo.
 * Sirve como referencia del patrón POM + fixtures para la capacitación.
 */
test.describe('Carrito', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('agregar producto y validar carrito', async ({ inventoryPage }) => {
    await inventoryPage.AgregaProducto(products.backpack);
    await expect(inventoryPage.cartbabge).toHaveText('1');
  });

  test('Producto agregado se ve en carrito', async ({ inventoryPage, cartPage }) => {
    const producto = products.bolttshirt;
    await inventoryPage.AgregaProducto(products.bolttshirt);
    await expect(inventoryPage.cartbabge).toHaveText('1');
    await inventoryPage.OpenCart();

    await expect(cartPage.titulo).toHaveText('Your Cart');
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemByName(producto)).toBeVisible();
  });

  test('quitar producto del carrito por nombre', async ({ inventoryPage }) => {
    const producto = products.backpack;

    await inventoryPage.AgregaProducto(producto);
    await expect(inventoryPage.cartbabge).toHaveText('1');
    await inventoryPage.quitarProductoDelCarrito(producto);
    await expect(inventoryPage.cartbabge).toHaveCount(0);
  });
});
