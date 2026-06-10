import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly title: Locator;
  private readonly cartItems: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.cartItems = page.locator('.cart_item');
  }

  async getHeaderTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? '';
  }

  async getItemsCount(): Promise<number> {
    return this.cartItems.count();
  }
}
