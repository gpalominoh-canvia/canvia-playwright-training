import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Target } from '../core/Target';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/**
 * NIVEL 3 — Ejercicio 2 (Issue #4).
 * Interaction: elegir una opción de un <select> por su etiqueta visible.
 * Uso: Select.option('Price (low to high)').from(InventoryPage.SORT_DROPDOWN)
 */
export class Select implements Performable {
  private constructor(
    private readonly label: string,
    private readonly target: Target,
  ) {}

  static option(label: string): { from: (target: Target) => Select } {
    return {
      from: (target: Target) => new Select(label, target),
    };
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.abilityTo(BrowseTheWeb).locate(this.target).selectOption({ label: this.label });
  }
}
