import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { InventoryPage } from '../ui/InventoryPage';

/**
 * NIVEL 3 — pieza auxiliar (Issues #4 y #27).
 * Question: número del badge del carrito (0 si no existe en el DOM).
 */
export class CartBadgeCount implements Question<number> {
  static value(): CartBadgeCount {
    return new CartBadgeCount();
  }

  async answeredBy(actor: Actor): Promise<number> {
    const badge = actor.abilityTo(BrowseTheWeb).locate(InventoryPage.CART_BADGE);
    if ((await badge.count()) === 0) return 0;
    return Number((await badge.textContent())?.trim() ?? '0');
  }
}
