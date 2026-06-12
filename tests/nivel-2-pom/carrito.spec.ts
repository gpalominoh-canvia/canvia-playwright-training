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
    await inventoryPage.agregarProducto(products.backpack);
    expect(await inventoryPage.cantidadEnCarrito()).toBe(1);
  });

  test('producto agregado se ve en carrito', async ({ inventoryPage, cartPage }) => {
    const producto = products.bolttshirt;

    await inventoryPage.agregarProducto(producto);
    expect(await inventoryPage.cantidadEnCarrito()).toBe(1);

    await inventoryPage.abrirCarrito();

    await expect(cartPage.titulo).toHaveText('Your Cart');
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemByName(producto)).toBeVisible();
  });

  test('quitar producto del carrito por nombre', async ({ inventoryPage }) => {
    const producto = products.backpack;

    await inventoryPage.agregarProducto(producto);
    expect(await inventoryPage.cantidadEnCarrito()).toBe(1);

    await inventoryPage.quitarProductoDelCarrito(producto);

    expect(await inventoryPage.cantidadEnCarrito()).toBe(0);
  });
});
