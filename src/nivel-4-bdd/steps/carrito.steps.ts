import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

/**
 * Steps del carrito. El step "agrego ... al carrito" está parametrizado por el
 * nombre del producto ({string}): localiza la tarjeta por su texto y hace clic
 * en su botón "Add to cart", evitando un selector distinto por cada producto.
 */

When('agrego {string} al carrito', async function (this: CustomWorld, producto: string) {
  const tarjeta = this.page.locator('.inventory_item').filter({ hasText: producto });
  await tarjeta.getByRole('button', { name: 'Add to cart' }).click();
});

Then(
  'el contador del carrito debería mostrar {string}',
  async function (this: CustomWorld, cantidad: string) {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText(cantidad);
  },
);
