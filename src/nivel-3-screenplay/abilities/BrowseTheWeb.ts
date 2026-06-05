import { Locator, Page } from '@playwright/test';
import { Ability } from '../core/Ability';
import { Target } from '../core/Target';

/**
 * Habilidad de navegar la web: envuelve la `Page` de Playwright.
 * Las interactions y questions la usan para actuar sobre el navegador.
 */
export class BrowseTheWeb extends Ability {
  constructor(public readonly page: Page) {
    super();
  }

  /** Construye la habilidad a partir de una Page de Playwright. */
  static using(page: Page): BrowseTheWeb {
    return new BrowseTheWeb(page);
  }

  /** Resuelve un Target a un Locator de Playwright. */
  locate(target: Target): Locator {
    return this.page.locator(target.selector);
  }
}
