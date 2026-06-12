import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { AddProductToCart } from '@screenplay/tasks/AddProductToCart';
import { CartBadgeCount } from '@screenplay/questions/CartBadgeCount';
import { InventoryPage } from '@screenplay/ui/InventoryPage';
import { ScreenplayWorld } from '../support/world';

/**
 * NIVEL 4.1 — Ejercicio 2 (Issue #35): steps del carrito que delegan en Tasks
 * y Questions del Nivel 3 (importadas de @screenplay). Sin selectores.
 */
When('agrego la mochila al carrito', async function (this: ScreenplayWorld) {
  await this.actor.attemptsTo(AddProductToCart.the(InventoryPage.ADD_BACKPACK));
});

Then(
  'el contador del carrito debería ser {string}',
  async function (this: ScreenplayWorld, cantidad: string) {
    expect(await this.actor.asksFor(CartBadgeCount.value())).toBe(Number(cantidad));
  },
);
