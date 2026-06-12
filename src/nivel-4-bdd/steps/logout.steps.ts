import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

/**
 * Steps de cierre de sesión. Los steps de login (Antecedentes) NO se redefinen
 * aquí: se reutilizan los de `login.steps.ts`, que ya describen "estoy en la
 * página de login", "inicio sesión..." y "debería ver la página de inventario".
 */

When('cierro sesión', async function (this: CustomWorld) {
  await this.page.locator('#react-burger-menu-btn').click();
  await this.page.locator('#logout_sidebar_link').click();
});

Then('debería ver la página de login', async function (this: CustomWorld) {
  await expect(this.page.locator('[data-test="login-button"]')).toBeVisible();
});
