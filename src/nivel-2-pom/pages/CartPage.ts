import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly titulo: Locator;
  readonly items: Locator;
  readonly botonContinuarComprando: Locator;
  readonly botonCheckout: Locator;
  readonly contadorItems: Locator;

  constructor(page: Page) {
    super(page);

    this.titulo = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="inventory-item"]');
    this.botonContinuarComprando = page.locator('[data-test="continue-shopping"]');
    this.botonCheckout = page.locator('[data-test="checkout"]');
    this.contadorItems = page.locator('[data-test="shopping-cart-badge"]');
  }

  itemByName(productName: string): Locator {
    return this.items.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', {
        hasText: productName,
      }),
    });
  }
}
