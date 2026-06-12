import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { Actor } from '@screenplay/core/Actor';

/**
 * NIVEL 4.1 — BDD + Screenplay.
 *
 * A diferencia del Nivel 4 (donde el World guarda solo la `page`), aquí el
 * contexto compartido expone además un **Actor** de Screenplay. Los steps ya
 * no tocan `this.page` directamente: delegan en `this.actor` para intentar
 * Tasks y hacer Questions. Así Gherkin sigue describiendo el *qué* y el
 * framework Screenplay encapsula el *cómo*.
 */
export class ScreenplayWorld extends World {
  context!: BrowserContext;
  page!: Page;
  actor!: Actor;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(ScreenplayWorld);
