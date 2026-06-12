import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Target } from '../core/Target';
import { Click } from '../interactions/Click';

/**
 * NIVEL 3 — Ejercicio 3 (Issue #4).
 * Task: agregar un producto al carrito. Recibe el Target del botón
 * "Add to cart" del producto (p. ej. InventoryPage.ADD_BACKPACK).
 *
 * Uso: actor.attemptsTo(AddProductToCart.the(InventoryPage.ADD_BACKPACK))
 */
export class AddProductToCart implements Performable {
  private constructor(private readonly addButton: Target) {}

  static the(addButton: Target): AddProductToCart {
    return new AddProductToCart(addButton);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(this.addButton));
  }
}
