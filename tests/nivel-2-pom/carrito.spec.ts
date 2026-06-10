import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';
import { InventoryPage } from '@screenplay/ui/InventoryPage';
import { CartPage } from '@pom/pages/CartPage';

/**
 * Suite de ejemplo: inicio de sesión en SauceDemo.
 * Sirve como referencia del patrón POM + fixtures para la capacitación.
 */
test.describe('Carrito', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username,users.standard.password);
  });

  test('agregar producto y validar carrito', async ({ inventoryPage }) => {
    await inventoryPage.AgregaProducto(products.backpack);
    await expect(inventoryPage.cartbadge).toHaveText('1');
  }); 

  test('Producto agregado se ve en carrito', async ({ inventoryPage, cartPage }) => {
    const producto=products.bolttshirt;
    await inventoryPage.AgregaProducto(producto);
    await expect(inventoryPage.cartbadge).toHaveText('1');
    await inventoryPage.OpenCart();
    
    await expect(cartPage.titulo).toHaveText('Your Cart');
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemByName(producto)).toBeVisible();
  });

  test('Quitar producto y validar que ya no esta en carrito', async ({inventoryPage})=> {
    const producto=products.bolttshirt;
    await inventoryPage.AgregaProducto(producto);
    await expect(inventoryPage.cartbadge).toHaveText('1');
    await inventoryPage.removeProductFromCart(producto);
    await expect(inventoryPage.cartbadge).not.toBeVisible();

  });

});
