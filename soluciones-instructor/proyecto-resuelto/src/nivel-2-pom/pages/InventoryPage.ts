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

  /**
   * NIVEL 2 — Ejercicio 2: agrega un producto al carrito por su nombre visible.
   * Localiza la tarjeta que contiene el nombre y pulsa su botón "Add to cart".
   */
  async addProductByName(name: string): Promise<void> {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    await item.getByRole('button', { name: 'Add to cart' }).click();
  }

  /** Número del badge del carrito (0 si está vacío / no existe en el DOM). */
  async getCartBadgeCount(): Promise<number> {
    const badge = this.page.locator('.shopping_cart_badge');
    if ((await badge.count()) === 0) return 0;
    return Number((await badge.textContent())?.trim() ?? '0');
  }
}
