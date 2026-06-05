import {
  Before,
  After,
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
} from '@cucumber/cucumber';
import { Browser, chromium } from '@playwright/test';
import { CustomWorld } from './world';

// Tiempo máximo por step (Cucumber usa 5s por defecto, lo subimos a 30s).
setDefaultTimeout(30_000);

const BASE_URL = process.env.BASE_URL ?? 'https://www.saucedemo.com';
let browser: Browser;

// Se lanza una sola vez antes de todos los escenarios.
BeforeAll(async () => {
  browser = await chromium.launch();
});

// Se cierra al terminar todo.
AfterAll(async () => {
  await browser.close();
});

// Contexto y página nuevos por escenario (aislamiento entre tests).
Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({ baseURL: BASE_URL });
  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
  await this.page?.close();
  await this.context?.close();
});
