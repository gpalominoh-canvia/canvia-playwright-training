import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly title: Locator;
  private readonly items: Locator;
  private readonly button_continue_shopping: Locator;
  private readonly button_checkout: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.items = page.locator('[data-test="cart-list"]');
    this.button_continue_shopping = page.locator('[data-test="continue-shopping"]');
    this.button_checkout = page.locator('[data-test="checkout"]');
  }

  async getHeaderTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? '';
  }

  async getItemsCount(): Promise<number> {
    return this.items.count();
  }

  async clickContinueShopping(): Promise<void> {
    await this.button_continue_shopping.click();
  }

  async clickCheckout(): Promise<void> {
    await this.button_checkout.click();
  }

  async expectCartTitle(): Promise<void> {
    await expect(this.title).toHaveText('Your Cart');
  }
}
