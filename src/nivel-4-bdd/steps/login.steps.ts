import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

/**
 * Step definitions: conectan cada línea Gherkin (Dado/Cuando/Entonces) con
 * código que actúa sobre el navegador. El texto del patrón debe coincidir con
 * el del archivo .feature; `{string}` captura los valores entre comillas.
 */

Given('que estoy en la página de login', async function (this: CustomWorld) {
  await this.page.goto('/');
});

When(
  'inicio sesión con usuario {string} y contraseña {string}',
  async function (this: CustomWorld, usuario: string, contrasena: string) {
    await this.page.locator('[data-test="username"]').fill(usuario);
    await this.page.locator('[data-test="password"]').fill(contrasena);
    await this.page.locator('[data-test="login-button"]').click();
  },
);

Then('debería ver la página de inventario', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL(/inventory/);
  await expect(this.page.locator('.title')).toHaveText('Products');
});

Then(
  'debería ver el mensaje de error {string}',
  async function (this: CustomWorld, mensaje: string) {
    await expect(this.page.locator('[data-test="error"]')).toContainText(mensaje);
  },
);

When('cierro sesión desde el menú lateral', async function (this: CustomWorld) {
  await this.page.locator('#react-burger-menu-btn').click();
  await this.page.locator('[data-test="logout-sidebar-link"]').click();
});

Then('debería volver a la página de login', async function (this: CustomWorld) {
  await expect(this.page.locator('[data-test="username"]')).toBeVisible();
  await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
});

When(
  'agrego el producto {string} al carrito',
  async function (this: CustomWorld, producto: string) {
    const item = this.page.locator('.inventory_item').filter({ hasText: producto });
    await item.locator('[data-test^="add-to-cart"]').click();
  },
);

Then(
  'el badge del carrito debería mostrar {string}',
  async function (this: CustomWorld, cantidad: string) {
    await expect(this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText(cantidad);
  },
);
