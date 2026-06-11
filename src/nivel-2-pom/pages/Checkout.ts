import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly title: Locator;
  private readonly firstName: Locator;
  private readonly lastName: Locator;
  private readonly postalCode: Locator;
  private readonly buttonContinue: Locator;
  private readonly buttonCancel: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.buttonContinue = page.locator('[data-test="cancel"]');
    this.buttonCancel = page.locator('[data-test="continue"]');
  }

  async expectCartTitle(expectedTitle: string): Promise<void> {
    await expect(this.title).toHaveText(expectedTitle);
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }
  async clickContinue(): Promise<void> {
    await this.buttonContinue.click();
  }
  async clickCancel(): Promise<void> {
    await this.buttonCancel.click();
  }
}
