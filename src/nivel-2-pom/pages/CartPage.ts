import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object de la página de carrito.
 */

export class CartPage extends BasePage {
    readonly titulo: Locator;
    readonly items: Locator;
    private readonly boton_continuar_comprando: Locator;
    private readonly boton_checkout: Locator;
    private readonly contador_items: Locator;
    
    constructor(page: Page){
        super(page);
        this.titulo=page.locator('[data-test="title"]');
        this.items=page.locator('[data-test="inventory-item"]');
        this.boton_continuar_comprando=page.locator('[data-test="continue-shopping"]');
        this.boton_checkout=page.locator('[data-test="checkout"]');
        this.contador_items=page.locator('[data-test="shopping-cart-badge"]');

    }


  /** ejercicio 02 */
  async CantidadProductos(): Promise<number>{
    return this.items.count();
  }

  itemByName(productName: string): Locator {
    return this.items.filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }),
    });
  }
}
