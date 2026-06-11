import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { InventoryPage } from '../ui/InventoryPage';

export class CartBadgeCount implements Question<number> {
  private constructor() {}

  static displayed(): CartBadgeCount {
    return new CartBadgeCount();
  }

  async answeredBy(actor: Actor): Promise<number> {
    const badge = actor.abilityTo(BrowseTheWeb).locate(InventoryPage.CART_BADGE);
    if ((await badge.count()) === 0) {
      return 0;
    }
    const text = await badge.textContent();
    return Number(text?.trim() || '0');
  }
}
