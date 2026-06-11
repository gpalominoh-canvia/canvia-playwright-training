import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { InventoryPage } from '../ui/InventoryPage';

export class ProductPrices implements Question<number[]> {
  static displayed(): ProductPrices {
    return new ProductPrices();
  }

  async answeredBy(actor: Actor): Promise<number[]> {
    const pricesText = await actor
      .abilityTo(BrowseTheWeb)
      .locate(InventoryPage.PRICES_ITEMS)
      .allTextContents();

    return pricesText.map((price) => Number(price.replace('$', '')));
  }
}
