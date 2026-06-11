import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object de la página de inventario (post-login) de SauceDemo.
 */
export class InventoryPage extends BasePage {
  readonly title: Locator;
  private readonly inventoryItems: Locator;
  readonly cartbabge: Locator;
  private readonly cartLink: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
    this.cartbabge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  /** Texto del título de la sección ("Products"). */
  async getHeaderTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? '';
  }

  /** Cantidad de productos listados. */
  async getItemsCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async AgregaProducto(productname: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productname });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  async quitarProductoDelCarrito(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async OpenCart(): Promise<void> {
    await this.cartLink.click();
  }
}
