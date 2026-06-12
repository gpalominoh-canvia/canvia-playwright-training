import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';
import { InventoryPage } from '../ui/InventoryPage';

/**
 * RETO NIVEL 3 — Ejercicio 1 (Issue #27).
 * Question: precios del inventario como números (sin el símbolo $).
 * Usa allTextContents() para leer toda la colección de una vez.
 */
export class ProductPrices implements Question<number[]> {
  static displayed(): ProductPrices {
    return new ProductPrices();
  }

  async answeredBy(actor: Actor): Promise<number[]> {
    const textos = await actor
      .abilityTo(BrowseTheWeb)
      .locate(InventoryPage.PRICES)
      .allTextContents();
    return textos.map((t) => Number(t.replace('$', '').trim()));
  }
}
