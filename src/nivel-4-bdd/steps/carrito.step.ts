import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

/**
 * Step definitions: conectan cada línea Gherkin (Dado/Cuando/Entonces) con
 * código que actúa sobre el navegador. El texto del patrón debe coincidir con
 * el del archivo .feature; `{string}` captura los valores entre comillas.
 */

When('que estoy en la página de inventario', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/inventory/);
});

When(
  'agrego el producto {string} al carrito',
  async function (this: CustomWorld, producto: string) {
    await this.page.locator(`.inventory_item:has-text("${producto}") button`).click();
  },
);
Then(
  'el carrito debería mostrar {int} artículo',
  async function (this: CustomWorld, cantidad: number) {
    await expect(this.page.locator('#shopping_cart_container')).toHaveText(String(cantidad));
  },
);
