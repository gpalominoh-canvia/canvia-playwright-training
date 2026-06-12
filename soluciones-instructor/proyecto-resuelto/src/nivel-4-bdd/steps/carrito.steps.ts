import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

/**
 * NIVEL 4 — Ejercicio 2 (Issue #5): steps del carrito.
 * El step de login se reutiliza desde login.steps.ts (no se redefine).
 */
When('agrego el producto {string} al carrito', async function (this: CustomWorld, nombre: string) {
  const item = this.page.locator('.inventory_item').filter({ hasText: nombre });
  await item.getByRole('button', { name: 'Add to cart' }).click();
});

Then(
  'el contador del carrito debería mostrar {string}',
  async function (this: CustomWorld, cantidad: string) {
    await expect(this.page.locator('.shopping_cart_badge')).toHaveText(cantidad);
  },
);
