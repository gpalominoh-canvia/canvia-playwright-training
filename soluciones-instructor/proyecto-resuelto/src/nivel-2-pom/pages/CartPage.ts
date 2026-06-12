import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * NIVEL 2 — Ejercicio 1 (Issue #3).
 * Page Object de la página del carrito de SauceDemo.
 */
export class CartPage extends BasePage {
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  /** Abre la página del carrito haciendo clic en el ícono. */
  async open(): Promise<void> {
    await this.cartLink.click();
  }

  /** Número que muestra el badge del carrito (0 si no existe en el DOM). */
  async getBadgeCount(): Promise<number> {
    if ((await this.cartBadge.count()) === 0) return 0;
    return Number((await this.cartBadge.textContent())?.trim() ?? '0');
  }

  /** Cantidad de líneas de producto dentro del carrito. */
  async getItemsCount(): Promise<number> {
    return this.cartItems.count();
  }

  /** Avanza al checkout. */
  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
