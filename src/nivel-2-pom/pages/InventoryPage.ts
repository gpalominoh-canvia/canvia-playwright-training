import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { CartPage } from './CartPage';

/**
 * Page Object de la página de inventario (post-login) de SauceDemo.
 */
export class InventoryPage extends BasePage {
  private readonly title: Locator;
  private readonly inventoryItems: Locator;
  private readonly cartBadge: Locator;
  private readonly button_cart: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.button_cart = page.locator('[data-test="shopping-cart-link"]');
  }

  /** Texto del título de la sección ("Products"). */
  async getHeaderTitle(): Promise<string> {
    return (await this.title.textContent())?.trim() ?? '';
  }

  /** Cantidad de productos listados. */
  async getItemsCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  /** Cantidad de productos agregados al carrito. */
  async getCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
  }

  /** Agrega un producto al carrito por su nombre. */
  async addItemToCart(itemName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  getItemByName(itemName: string): Locator {
    return this.inventoryItems.filter({ hasText: itemName });
  }

  async expectCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(expectedCount.toString());
  }

  async goToCart(): Promise<CartPage> {
    await this.button_cart.click();
    return new CartPage(this.page);
  }
}
