import { Given, When, Then } from '@cucumber/cucumber';
import { expect, chromium, Page, Browser } from '@playwright/test';

let browser: Browser;
let page: Page;

// Antecedentes
Given('que estoy en la página de inventario', async function () {
  browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  page = await context.newPage();

  // Login previo necesario para llegar al inventario
  await page.goto('https://saucedemo.com');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Verificación de que estamos en inventario
  await expect(page).toHaveURL('https://saucedemo.cominventory.html');
});

// Escenario
When('Cuando el usuario hace clic en el botón de {string}', async function () {
  // En SauceDemo, el logout está dentro del menú de la hamburguesa
  await page.locator('#react-burger-menu-btn').click();
  await page.locator('[data-test="logout-sidebar-link"]').click();

  // Clic en el enlace de Logout
  await page.locator('[data-test="logout-sidebar-link"]').click();
});

Then('el usuario es redirigido automáticamente a la página de login', async function () {
  // Verifica que volvió a la URL base de inicio de sesión
  await expect(page).toHaveURL('https://saucedemo.com');

  // Verifica que el botón de login vuelve a ser visible
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();

  // Cierre del navegador limpio
  await browser.close();
});
