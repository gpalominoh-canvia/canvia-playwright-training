import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object de la página de inventario (post-login) de SauceDemo.
 */
export class InventoryPage extends BasePage {
  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly cartLink: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  /** Texto del título de la sección ("Products"). */
  async getHeaderTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? '';
  }

  /** Cantidad de productos listados. */
  async getItemsCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async addProductToCart(productName: string): Promise<void> {
    const product = this.inventoryItems.filter({
      hasText: productName,
    });

    await product
      .getByRole('button', {
        name: 'Add to cart',
      })
      .click();
  }

  /** Hace click en el icono del carrito para navegar */
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }
}
