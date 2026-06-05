import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object de la página de inventario (post-login) de SauceDemo.
 */
export class InventoryPage extends BasePage {
  private readonly title: Locator;
  private readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
  }

  /** Texto del título de la sección ("Products"). */
  async getHeaderTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? '';
  }

  /** Cantidad de productos listados. */
  async getItemsCount(): Promise<number> {
    return this.inventoryItems.count();
  }
}
