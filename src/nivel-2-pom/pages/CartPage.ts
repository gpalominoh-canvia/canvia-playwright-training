import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  async getHeaderTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? '';
  }

  async getItemsCount(): Promise<number> {
    return this.cartItems.count();
  }
  itemByName(name: string): Locator {
    return this.cartItems.filter({ hasText: name });
  }

  removeProductByName(name: string): Promise<void> {
    return this.itemByName(name).getByRole('button', { name: 'Remove' }).click();
  }
}
