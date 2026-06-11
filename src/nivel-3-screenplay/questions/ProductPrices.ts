import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { InventoryPage } from '../ui/InventoryPage';

/** Question: precios visibles del inventario como numeros. */
export class ProductPrices implements Question<number[]> {
  static visible(): ProductPrices {
    return new ProductPrices();
  }

  async answeredBy(actor: Actor): Promise<number[]> {
    const priceTexts = await actor
      .abilityTo(BrowseTheWeb)
      .locate(InventoryPage.PRICES)
      .allTextContents();

    return priceTexts.map((price) => Number(price.replace('$', '')));
  }
}
