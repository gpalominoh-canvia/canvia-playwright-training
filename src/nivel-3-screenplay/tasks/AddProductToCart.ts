import type { Actor } from '../core/Actor';
import { InventoryPage } from '../ui/InventoryPage';
import { Click } from '@screenplay/interactions/Click';
import { Performable } from '@screenplay/core/Performable';

export class AddProductToCart implements Performable {
  private constructor() {}
  static backpack(): AddProductToCart {
    return new AddProductToCart();
  }
  async performAs(actor: Actor): Promise<void> {
    await actor.attemptsTo(Click.on(InventoryPage.ADD_BACKPACK));
  }
}
