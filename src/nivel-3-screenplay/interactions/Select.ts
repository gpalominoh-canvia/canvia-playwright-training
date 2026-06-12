import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Target } from '../core/Target';
import { BrowseTheWeb } from '../abilities/BrowseTheWeb';

/** Interaction: seleccionar una opcion de un elemento select. */
export class Select implements Performable {
  private constructor(
    private readonly option: string,
    private readonly target: Target,
  ) {}

  static option(option: string): { from: (target: Target) => Select } {
    return {
      from: (target: Target) => new Select(option, target),
    };
  }

  async performAs(actor: Actor): Promise<void> {
    await actor.abilityTo(BrowseTheWeb).locate(this.target).selectOption({ label: this.option });
  }
}
