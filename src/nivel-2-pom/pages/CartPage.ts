import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object de la pagina del carrito de SauceDemo.
 */
export class CartPage extends BasePage {
  private readonly cartItems: Locator;
  private readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
    this.title = page.locator('.title');
  }

  /** Texto del titulo de la pagina del carrito ("Your Cart"). */
  async getHeaderTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? '';
  }

  /** Cantidad de productos en el carrito. */
  async getItemsCount(): Promise<number> {
    return this.cartItems.count();
  }
}
