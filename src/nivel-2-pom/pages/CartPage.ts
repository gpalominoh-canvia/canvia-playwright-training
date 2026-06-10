import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private readonly cartLink: Locator;
  private readonly cartItems: Locator;
  private readonly checkoutButton: Locator;
  private readonly continueShoppingButton: Locator;
  private readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);

    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  // Abre la página del carrito haciendo clic en el ícono del carrito.
  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  // Obtiene la cantidad mostrada en el contador del carrito.
  async getCartItemCount(): Promise<number> {
    const countText = await this.cartBadge.textContent();
    return parseInt(countText ?? '0');
  }

  // Obtiene el texto exacto del contador del carrito.
  async getCartBadgeText(): Promise<string> {
    return (await this.cartBadge.textContent())?.trim() ?? '';
  }

  // Obtiene los nombres de todos los productos agregados al carrito.
  async getCartItems(): Promise<string[]> {
    const items: string[] = [];
    const itemCount = await this.cartItems.count();

    for (let i = 0; i < itemCount; i++) {
      const itemName = await this.cartItems
        .nth(i)
        .locator('[data-test="inventory-item-name"]')
        .textContent();

      if (itemName) {
        items.push(itemName.trim());
      }
    }

    return items;
  }

  // Hace clic en el botón Checkout para iniciar el proceso de compra.
  async clickCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  // Hace clic en Continue Shopping para volver a la página de productos.
  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  // Elimina un producto específico del carrito por su nombre.
  async removeItem(itemName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: itemName });
    await item.getByRole('button', { name: 'Remove' }).click();
  }

  // Verifica si un producto específico está dentro del carrito.
  async isItemInCart(itemName: string): Promise<boolean> {
    const items = await this.getCartItems();
    return items.includes(itemName);
  }

  // Verifica si el carrito está vacío.
  async isCartEmpty(): Promise<boolean> {
    return (await this.cartItems.count()) === 0;
  }
}