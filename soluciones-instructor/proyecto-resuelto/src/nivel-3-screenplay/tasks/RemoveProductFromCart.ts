import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Target } from '../core/Target';
import { Click } from '../interactions/Click';

/**
 * RETO NIVEL 3 — Ejercicio 4 (Issue #27).
 * Task simétrica a AddProductToCart: quita un producto del carrito. Recibe el
 * Target del botón "Remove" (p. ej. InventoryPage.REMOVE_BACKPACK).
 *
 * Uso: actor.attemptsTo(RemoveProductFromCart.the(InventoryPage.REMOVE_BACKPACK))
 */
export class RemoveProductFromCart implements Performable {
  private constructor(private readonly removeButton: Target) {}

  static the(removeButton: Target): RemoveProductFromCart {
    return new RemoveProductFromCart(removeButton);
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(this.removeButton));
  }
}
