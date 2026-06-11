import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

test.describe('Carrito de compras', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('Agregar productos al carrito y verificar cantidad', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.openCart();

    // Aserciones
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.cartItems).toHaveCount(1);
  });

  //Ejercicio: agregar un producto al carrito y validar que el badge del carrito se actualice con la cantidad correcta (en este caso, "1").

  test('Agregar producto y validar incremento en el badge carrito', async ({ inventoryPage }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  //Ejercicio remover un producto del carrito y validar que el badge del carrito se actualice (desaparezca) correctamente.

  test('Remover producto por nombre', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.openCart();
    await cartPage.removeProductByName(products.backpack);
    await expect(cartPage.cartBadge).toBeHidden();
  });
});
