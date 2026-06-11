import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { InventoryPage } from '@screenplay/ui/InventoryPage';

export class CartBadgeCount implements Question<number> {
  private constructor() {}

  static displayed(): CartBadgeCount {
    return new CartBadgeCount();
  }

  async answeredBy(actor: Actor): Promise<number> {
    const badge = actor.abilityTo(BrowseTheWeb).locate(InventoryPage.CART_BADGE);

    const count = await badge.count();

    if (count === 0) {
      return 0;
    }

    const badgeText = await badge.textContent();

    return badgeText ? parseInt(badgeText.trim(), 10) : 0;
  }
}
