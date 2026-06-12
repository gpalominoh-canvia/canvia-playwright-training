import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Click } from '../interactions/Click';
import { InventoryPage } from '../ui/InventoryPage';

/** Task: quitar la mochila del carrito. */
export class RemoveProductFromCart implements Performable {
  static backpack(): RemoveProductFromCart {
    return new RemoveProductFromCart();
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(InventoryPage.REMOVE_BACKPACK_BUTTON));
  }
}
