import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';

/**
 * Step definitions: conectan cada línea Gherkin (Dado/Cuando/Entonces) con
 * código que actúa sobre el navegador. El texto del patrón debe coincidir con
 * el del archivo .feature; `{string}` captura los valores entre comillas.
 */

When('cierro sesión', async function (this: CustomWorld) {
  await this.page.locator('#react-burger-menu-btn').click();
  await this.page.locator('#logout_sidebar_link').click();
});
Then('debería volver a la página de login', async function (this: CustomWorld) {
  await expect(this.page).toHaveURL('https://www.saucedemo.com/');
});
