import { Before, After, BeforeAll, AfterAll, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';
import { BrowseTheWeb } from '@screenplay/abilities/BrowseTheWeb';
import { ScreenplayWorld } from './world';

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

// Por cada escenario: contexto y página nuevos (aislamiento) y un Actor
// con la habilidad de navegar la web usando esa página.
Before(async function (this: ScreenplayWorld) {
  this.context = await browser.newContext({ baseURL: BASE_URL });
  this.page = await this.context.newPage();
  this.actor = Actor.named('QA').whoCan(BrowseTheWeb.using(this.page));
});

After(async function (this: ScreenplayWorld) {
  await this.page?.close();
  await this.context?.close();
});
