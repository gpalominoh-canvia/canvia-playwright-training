import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { InventoryPage } from '../ui/InventoryPage';

/** Question: lista de precios visibles en el inventario, como números. */
export class ProductPrices implements Question<number[]> {
  private constructor() {}

  static displayed(): ProductPrices {
    return new ProductPrices();
  }

  async answeredBy(actor: Actor): Promise<number[]> {
    const locator = actor.abilityTo(BrowseTheWeb).locate(InventoryPage.PRICES);
    const texts = await locator.allTextContents();
    return texts.map((t) => Number(t.replace('$', '').trim()));
  }
}
