import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';

/**
 * El "World" es el contexto que comparten todos los steps de un mismo
 * escenario en Cucumber. Aquí guardamos el contexto y la página de Playwright
 * para usarlos desde los step definitions con `this.page`.
 */
export class CustomWorld extends World {
  context!: BrowserContext;
  page!: Page;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
