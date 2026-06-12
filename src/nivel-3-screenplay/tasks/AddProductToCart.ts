import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Click } from '../interactions/Click';
import { InventoryPage } from '../ui/InventoryPage';

export class AddProductToCart implements Performable {
  private constructor() {}

  static backpack(): AddProductToCart {
    return new AddProductToCart();
  }
  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(InventoryPage.ADD_BACKPACK));
  }
}
