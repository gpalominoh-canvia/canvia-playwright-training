import { test, expect } from '@pom/fixtures/pages.fixture';
import { users } from '@pom/data/users';
import { products } from '@pom/data/products';

test('Agregar cinco productos al carrito y validar contador', async ({
  loginPage,
  inventoryPage,
  cartPage,
}) => {

  await loginPage.open();

  await loginPage.login(
    users.standard.username,
    users.standard.password
  );

  await inventoryPage.addProductToCart(products.backpack);
  await inventoryPage.addProductToCart(products.bikeLight);
  await inventoryPage.addProductToCart(products.boltTShirt);
  await inventoryPage.addProductToCart(products.fleeceJacket);
  await inventoryPage.addProductToCart(products.onesie);

  const cartCount = await cartPage.getCartItemCount();

  expect(cartCount).toBe(5);
});