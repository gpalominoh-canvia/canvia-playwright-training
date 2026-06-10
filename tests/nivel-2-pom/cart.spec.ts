import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

test.describe('Carrito de compras', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
    // Agrega esta línea para realizar la autenticación antes de cada test
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('Agregar productos al carrito y verificar cantidad', async ({ inventoryPage, cartPage }) => {
    // Ahora sí estás dentro de la página de inventario
    await inventoryPage.addProductToCart(products.backpack);
    await inventoryPage.openCart();

    // Aserciones
    expect(await cartPage.getHeaderTitle()).toBe('Your Cart');
    expect(await cartPage.getItemsCount()).toBe(1);
  });
});
