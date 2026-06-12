import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium } from '@playwright/test';
import fs from 'node:fs';
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

// NIVEL 5 — Ejercicio 5 (reto): si el escenario falla, captura pantalla.
// La imagen se adjunta al reporte HTML y se guarda para subirla como artefacto.
After(async function (this: CustomWorld, { result, pickle }) {
  if (result?.status === Status.FAILED && this.page) {
    fs.mkdirSync('playwright-report/screenshots', { recursive: true });
    const safe = pickle.name.replace(/[^a-z0-9]+/gi, '_');
    const png = await this.page.screenshot({
      path: `playwright-report/screenshots/${safe}.png`,
    });
    this.attach(png, 'image/png');
  }
  await this.page?.close();
  await this.context?.close();
});
